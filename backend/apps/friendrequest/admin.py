from django.contrib import admin

from .models import FriendRequest


class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ['id', 'requester', 'receiver', 'status']
    list_filter = ['status']


admin.site.register(FriendRequest, FriendRequestAdmin)
