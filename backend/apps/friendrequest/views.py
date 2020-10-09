import os

from django.core.mail import send_mail
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from apps.user.models import User
from apps.user.serializers import UserSerializer

from .models import FriendRequest
from .permissions import IsInvolvedInRequest, IsRequestReceiver
from .serializers import FriendRequestSerializer, FriendRequestCreateSerializer


class ListFriends(ListAPIView):
    """
    get: Get all accepted friends of logged-in user (authorization required)
    """

    serializer_class = UserSerializer

    # Get all users that have accepted friend requests with logged in user
    def get_queryset(self):
        return self.request.user.friends()


class ListFriendRequests(ListAPIView):
    """
    get: Get all requests in which the logged-in user is involved (authorization required)
    """

    serializer_class = FriendRequestSerializer

    def get_queryset(self):
        requests = FriendRequest.objects.all()
        return requests.filter(requester=self.request.user) | requests.filter(receiver=self.request.user)


class CreateFriendRequest(CreateAPIView):
    """
    post: Create a new friend request (authorization required; request to oneself not possible)
    """

    queryset = FriendRequest
    serializer_class = FriendRequestCreateSerializer

    def create(self, request, *args, **kwargs):
        requester = request.user

        # If receiver does not exist, return error
        try:
            receiver = User.objects.get(pk=kwargs['user_id'])
        except User.DoesNotExist:
            return Response({"Error": "User with this id does not exist."},
                            status=status.HTTP_404_NOT_FOUND)

        # If receiver is same as requester, return error
        if requester == receiver:
            return Response({"Error": "Friend request to self is not possible."},
                            status=status.HTTP_406_NOT_ACCEPTABLE)

        # If exact same request already exists, return error
        existing_requests = FriendRequest.objects.filter(requester=requester, receiver=receiver)
        if existing_requests:
            return Response(
                {"Error": f"You already sent a request for this user (request id={existing_requests[0].id}). "
                          f"Delete it to take request back."},
                status=status.HTTP_406_NOT_ACCEPTABLE)

        # Else create new request and send e-mail to receiver
        new_request = FriendRequest(requester=requester, receiver=receiver)
        new_request.save()
        send_mail(
            'New friend request',
            f'You have a new friend request from: {requester.first_name} {requester.last_name}',
            os.environ.get('EMAIL_HOST_USER'),
            [receiver.email],
            fail_silently=True
        )
        serializer = self.get_serializer(new_request)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class RetrieveUpdateDestroyFriendRequest(RetrieveUpdateDestroyAPIView):
    """
    get: Get request details (only users that are involved in request)
    patch: Partial update of request (only receiver of request)
    delete: Delete request (only users that are involved in request)
    """

    http_method_names = ['get', 'patch', 'delete']
    queryset = FriendRequest
    serializer_class = FriendRequestSerializer

    # Define permissions depending on method
    def get_permissions(self):
        if self.request and self.request.method == 'PATCH':
            permission_classes = [IsRequestReceiver]
        else:
            permission_classes = [IsInvolvedInRequest]
        return [permission() for permission in permission_classes]

    # Send e-mail when request gets updated
    def perform_update(self, serializer):
        old_status = serializer.instance.status
        updated_instance = serializer.save()
        new_status = updated_instance.status
        if old_status != new_status and old_status == "P":
            message = ""
            if new_status == "A":
                message = f"{updated_instance.receiver.first_name} accepted your friend request!"
            if new_status == "R":
                message = f"{updated_instance.receiver.first_name} rejected your friend request..."
            send_mail(
                'Friend request updated',
                message,
                os.environ.get('EMAIL_HOST_USER'),
                [updated_instance.receiver.email],
                fail_silently=True
            )
