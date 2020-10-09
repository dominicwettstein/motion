import os

from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django_otp.oath import totp
from rest_framework import status
from rest_framework.generics import UpdateAPIView, CreateAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import UserCreateSerializer, UserValidateSerializer, PasswordValidateSerializer

User = get_user_model()


# Function to generate one-time-code
def generate_code():
    secret_key = b'36384740399208477893'
    return totp(key=secret_key, step=1, digits=6)


class CreateUser(CreateAPIView):
    """
    Create new user with e-mail address (no authentication required)
    """

    permission_classes = [AllowAny]
    serializer_class = UserCreateSerializer

    # Create code, send e-mail and save inactive user
    def perform_create(self, serializer):
        code = generate_code()
        send_mail(
            'Thanks for registering',
            f'Welcome to Motion!\nHere is your code: {code}',
            os.environ.get('EMAIL_HOST_USER'),
            [serializer.validated_data['email']],
            fail_silently=False
        )
        serializer.save(code=code, username=code, is_active=False)


class ValidateUser(UpdateAPIView):
    """
    Activate user with code that was received by e-mail (no authentication required)
    """
    http_method_names = ['patch']
    permission_classes = [AllowAny]
    queryset = User
    serializer_class = UserValidateSerializer

    # Get user with this e-mail
    def get_object(self):
        return User.objects.get(email=self.request.data['email'])

    # Reset code, activate user and set password
    def perform_update(self, serializer):
        user = serializer.save(code="", is_active=True)
        user.set_password(serializer.validated_data['password'])
        user.save()


class PasswordReset(GenericAPIView):
    """
    post: Send a code to user that can be used for password reset (no authentication required)
    """

    permission_classes = [AllowAny]
    queryset = User
    serializer_class = UserCreateSerializer

    def post(self, request, *args, **kwargs):
        # if no e-mail provided, send error
        if "email" not in request.data:
            return Response({"email": "Please provide e-mail"}, status=status.HTTP_404_NOT_FOUND)
        email = request.data['email']

        # make sure user exists
        user = User.objects.get(email=email)
        if not user:
            return Response({"email": "No user found for this e-mail"}, status=status.HTTP_404_NOT_FOUND)

        # generate new code, save it, send e-mail and response
        code = generate_code()
        send_mail(
            'Password reset',
            f'Here is your code for password reset: {code}',
            os.environ.get('EMAIL_HOST_USER'),
            [email],
            fail_silently=False
        )
        user.code = code
        user.save()
        return Response({"code": "Reset code was sent to e-mail"}, status=status.HTTP_200_OK)


# Note: I chose a generic view without serializer here because this results in less code overall
class PasswordValidate(GenericAPIView):
    """
    patch: Update user password with code (no authentication required)
    """
    permission_classes = [AllowAny]
    queryset = User
    serializer_class = PasswordValidateSerializer

    def patch(self, request, *args, **kwargs):
        user = User.objects.get(email=request.data['email'])
        # Check code
        if request.data['code'] != user.code:
            return Response({"code": "Code not valid for this email"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        # Check that password is not empty
        if not request.data['password']:
            return Response({"password": "Password cannot be empty"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        # Check that passwords match
        if request.data['password'] != request.data['password_repeat']:
            return Response({"password": "Passwords do not match"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        # Set new password, reset code and send response
        user.set_password(request.data['password'])
        user.code = ""
        user.save()
        return Response({"Success": "Password change successful"}, status=status.HTTP_200_OK)
