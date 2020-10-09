from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer used for user data get requests
    """

    things_user_likes = serializers.SerializerMethodField()

    # Decode list of strings
    @staticmethod
    def get_things_user_likes(obj):
        if obj.things_user_likes:
            return eval(obj.things_user_likes)
        else:
            return []

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'location', 'about_me', 'avatar', 'banner',
                  'things_user_likes', 'amount_of_posts', 'amount_of_likes', 'amount_of_friends', 'amount_of_followers',
                  'amount_following']


class UserSerializerUpdate(serializers.ModelSerializer):
    """
    Serializer used for user data update requests
    """

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'location', 'about_me', 'avatar', 'banner',
                  'things_user_likes']


class UserSerializerMinimal(serializers.ModelSerializer):
    """
    Serializer used for minimal user representation when retrieving posts
    """

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'location', 'avatar']


class UserSerializerFull(serializers.ModelSerializer):
    """
    Serializer used for complete user data retrieval
    """

    things_user_likes = serializers.SerializerMethodField()
    friends = UserSerializer(many=True)
    following = UserSerializer(many=True)
    followers = UserSerializer(many=True)

    # Decode list of strings
    @staticmethod
    def get_things_user_likes(obj):
        if obj.things_user_likes:
            return eval(obj.things_user_likes)
        else:
            return []

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'location', 'about_me', 'avatar', 'banner',
                  'things_user_likes', 'amount_of_posts', 'amount_of_likes', 'amount_of_friends', 'amount_of_followers',
                  'amount_following', 'friends', 'following', 'followers']


class UserSerializerEmpty(serializers.ModelSerializer):
    """
    Dummy serializer used for docs
    """

    class Meta:
        model = User
        fields = []
