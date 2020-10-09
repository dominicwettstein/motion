from rest_framework.permissions import BasePermission


class IsInvolvedInRequest(BasePermission):
    """
    Permission only if user is involved in request
    """

    def has_object_permission(self, request, view, obj):
        return request.user == obj.requester or request.user == obj.receiver


class IsRequestReceiver(BasePermission):
    """
    Permission only if user is receiver of request
    """

    def has_object_permission(self, request, view, obj):
        return request.user == obj.receiver
