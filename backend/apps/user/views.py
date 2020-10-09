import os

from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView, GenericAPIView, RetrieveAPIView, ListAPIView
from rest_framework.response import Response

from .permissions import IsSelfOrReadOnly
from .serializers import UserSerializer, UserSerializerUpdate, UserSerializerEmpty, UserSerializerFull

User = get_user_model()


class ListUsers(ListAPIView):
    """
    get: List all users (authentication required)
    """

    serializer_class = UserSerializer

    # Return results based on search parameters
    def get_queryset(self):
        queryset = User.objects.all()
        search = self.request.query_params.get('search')
        if search:
            return queryset.filter(first_name__icontains=search) | queryset.filter(
                last_name__icontains=search) | queryset.filter(email__icontains=search)
        else:
            return queryset


class RetrieveUser(RetrieveAPIView):
    """
    get: Retrieve info for single user (authentication required)
    """

    queryset = User
    serializer_class = UserSerializerFull


class RetrieveUpdateDestroyMe(RetrieveUpdateDestroyAPIView):
    """
    get: Get user details (authentication required)
    patch: Partial update of user details (only user himself)
    delete: Delete user (only user himself)
    """

    http_method_names = ['get', 'patch', 'delete']
    permission_classes = [IsSelfOrReadOnly]
    queryset = User

    def get_serializer_class(self):
        if self.request and self.request.method == 'GET':
            return UserSerializer
        else:
            return UserSerializerUpdate

    def get_object(self):
        return self.request.user


class ToggleFollowUser(GenericAPIView):
    """
    post: Toggle "follow" for given user (authentication required)
    """

    queryset = User
    serializer_class = UserSerializerEmpty

    def post(self, request, *args, **kwargs):
        target_user = self.get_object()
        my_following = request.user.following
        response = {}
        if target_user in my_following.all():
            my_following.remove(target_user)
            response = {"Success": "User unfollowed"}
        else:
            my_following.add(target_user)
            send_mail(
                'New follower',
                f'You have a new follower: {request.user.first_name} {request.user.last_name}',
                os.environ.get('EMAIL_HOST_USER'),
                [target_user.email],
                fail_silently=True
            )
            response = {"Success": "User followed"}
        return Response(response, status=status.HTTP_200_OK)


class ListFollowing(ListAPIView):
    """
    get: Get a list of all users that the logged in user is following (authentication required)
    """

    serializer_class = UserSerializer

    def get_queryset(self):
        return self.request.user.following.all()


class ListFollowers(ListAPIView):
    """
    get: Get a list of all followers of the logged in user (authentication required)
    """

    serializer_class = UserSerializer

    def get_queryset(self):
        return self.request.user.followers.all()
