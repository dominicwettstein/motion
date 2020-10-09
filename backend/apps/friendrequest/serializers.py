from rest_framework import serializers

from apps.user.serializers import UserSerializer

from .models import FriendRequest


class FriendRequestSerializer(serializers.ModelSerializer):
    """
    Serializer used for listing friend requests
    """

    requester = UserSerializer()
    receiver = UserSerializer()

    class Meta:
        model = FriendRequest
        fields = ['id', 'requester', 'receiver', 'status']
        read_only_fields = ['id', 'requester', 'receiver']


class FriendRequestCreateSerializer(serializers.ModelSerializer):
    """
    Serializer used for creating friend requests
    """

    class Meta:
        model = FriendRequest
        fields = []
