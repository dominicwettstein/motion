from rest_framework import serializers

from apps.user.serializers import UserSerializerMinimal

from .models import PostComment


class PostCommentSerializer(serializers.ModelSerializer):
    """
    Default serializer for post comments
    """

    user = UserSerializerMinimal()

    class Meta:
        model = PostComment
        fields = ['id', 'post', 'user', 'content']


class PostCommentSerializerCreate(serializers.ModelSerializer):
    """
    Default serializer for post comments
    """

    class Meta:
        model = PostComment
        fields = ['id', 'content']


class PostCommentSerializerInPost(serializers.ModelSerializer):
    """
    Reduced serializer for display within post context
    """

    user = UserSerializerMinimal()

    class Meta:
        model = PostComment
        fields = ['id', 'content', 'user']
