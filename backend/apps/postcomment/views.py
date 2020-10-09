from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from apps.post.models import Post

from .models import PostComment
from .serializers import PostCommentSerializer, PostCommentSerializerCreate


class ListCreatePostComment(ListCreateAPIView):
    """
    get: Get list of all comments for a post (authentication required)
    post: Create a new comment for a post (authentication required)
    """

    queryset = PostComment
    serializer_class = PostCommentSerializerCreate

    def post(self, request, **kwargs):
        post = Post.objects.get(id=kwargs['post_id'])
        new_comment = PostComment(user=request.user, post=post, content=request.data['content'])
        new_comment.save()
        serialized = PostCommentSerializerCreate(new_comment)
        return Response(serialized.data, status=status.HTTP_201_CREATED)

    def get(self, request, **kwargs):
        comments = Post.objects.get(id=kwargs['post_id']).comments
        serialized = PostCommentSerializer(comments, many=True)
        return Response(serialized.data)
