import os

from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.generics import GenericAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from apps.user.permissions import IsAuthorOrSuperOrReadOnly

from .models import Post
from .serializers import PostSerializer, PostSerializerCreateUpdate

User = get_user_model()


class ListCreatePost(ListCreateAPIView):
    """
    get: Get list of all posts (no authentication required)
    post: Create a new post (authentication required)
    """

    permission_classes = [IsAuthenticatedOrReadOnly]

    # use different serializer for get vs. other request types
    def get_serializer_class(self):
        if self.request and self.request.method == 'GET':
            return PostSerializer
        else:
            return PostSerializerCreateUpdate

    # check for search parameters and filter accordingly
    def get_queryset(self):
        queryset = Post.objects.all()
        search = self.request.query_params.get('search')
        if search:
            return queryset.filter(content__icontains=search)
        else:
            return queryset

    # when creating a new post, add user automatically and send e-mail to all friends
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        email_recipients = [user.email for user in self.request.user.friends()]
        post_content = serializer.data['content']
        send_mail(
            f'New post from {self.request.user.first_name}',
            f'{self.request.user.first_name} {self.request.user.last_name} posted something: \n---\n{post_content}',
            os.environ.get('EMAIL_HOST_USER'),
            email_recipients,
            fail_silently=True
        )


class RetrieveUpdateDestroyPost(RetrieveUpdateDestroyAPIView):
    """
    get: Get details of post by id (authentication required)
    patch: Partial update of post contents (only author of post)
    delete: Delete post (only author of post)
    """

    http_method_names = ['get', 'patch', 'delete']
    permission_classes = [IsAuthorOrSuperOrReadOnly]
    queryset = Post

    # use different serializer for get vs. other request types
    def get_serializer_class(self):
        if self.request and self.request.method == 'GET':
            return PostSerializer
        else:
            return PostSerializerCreateUpdate


class ToggleLikePost(GenericAPIView):
    """
    post: Toggle "like" status of a post (authentication required; not possible for own posts)
    """

    queryset = Post
    serializer_class = PostSerializer

    def post(self, request, *args, **kwargs):
        target_post = self.get_object()

        # Make sure user cannot like his own posts
        if target_post.user == request.user:
            return Response({"Fail": "You cannot like your own posts."},
                            status=status.HTTP_403_FORBIDDEN)

        # Toggle like status by adding/removing requesting user from "likers" list in post
        response = {}
        if request.user in target_post.likes.all():
            target_post.likes.remove(request.user)
            response = {"Success": "Post unliked"}
        else:
            target_post.likes.add(request.user)
            response = {"Success": "Post liked"}
        return Response(response, status=status.HTTP_200_OK)


class ListMyPosts(ListAPIView):
    """
    get: Get list of all posts of logged in user (authentication required)
    """

    serializer_class = PostSerializer

    def get_queryset(self):
        return self.request.user.posts


class ListLikedPosts(ListAPIView):
    """
    get: Get list of posts that were liked by logged in user (authentication required)
    """

    serializer_class = PostSerializer

    def get_queryset(self):
        return self.request.user.liked_posts.all()


class ListFollowingPosts(ListAPIView):
    """
    get: Get list of all posts of people logged in user is following (authentication required)
    """

    serializer_class = PostSerializer

    def get_queryset(self):
        following = self.request.user.following.all()
        return Post.objects.all().filter(user__in=following)


class ListFriendsPost(ListAPIView):
    """
    get: Get list of all posts of user's friends (authorization required)
    """

    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.all().filter(user__in=self.request.user.friends())


class ListUserPosts(ListAPIView):
    """
    get: Get list of all posts of a specific user (authentication required)
    """

    serializer_class = PostSerializer

    def get_queryset(self):
        return User.objects.get(pk=self.kwargs['pk']).posts


class ListUserPostsLiked(ListAPIView):
    """
    get: Get list of all posts a specific user liked (authentication required)
    """

    serializer_class = PostSerializer

    def get_queryset(self):
        return User.objects.get(pk=self.kwargs['pk']).liked_posts
