from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    """
    Simple serializer used for initial user creation and password reset
    """

    class Meta:
        model = User
        fields = ['email']


class UserValidateSerializer(serializers.ModelSerializer):
    """
    Serializer for user verification, with some validation checks
    """

    password_repeat = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'code', 'username', 'first_name', 'last_name', 'password', 'password_repeat']
        extra_kwargs = {
            'code': {'write_only': True},
            'password': {'write_only': True},
            'password_repeat': {'write_only': True}
        }

    def validate(self, data):
        # Check if code ok
        if data.get('code') != self.instance.code:
            raise serializers.ValidationError('Invalid code for this email')
        # Check if username was provided
        if data.get('username') is None:
            raise serializers.ValidationError('Username cannot be empty')
        # Check if password was provided and passwords match
        if not data.get('password'):
            raise serializers.ValidationError('Password cannot be empty')
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError('Passwords do not match')
        return data


class PasswordValidateSerializer(serializers.ModelSerializer):
    """
    Serializer used for password reset verification
    """

    password_repeat = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'code', 'password', 'password_repeat']
        extra_kwargs = {
            'code': {'write_only': True},
            'password': {'write_only': True},
            'password_repeat': {'write_only': True}
        }
