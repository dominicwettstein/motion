from rest_framework.permissions import BasePermission


class IsSelfOrReadOnly(BasePermission):
    """
    Write access to user data only for user himself
    """

    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        else:
            return request.user == obj


class IsAuthorOrSuperOrReadOnly(BasePermission):
    """
    Write access only if user is creator of object or superuser
    """

    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        else:
            return request.user == obj.user or request.user.is_superuser
