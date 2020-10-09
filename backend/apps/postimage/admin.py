from django.contrib import admin

from .models import PostImage


class PostImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'post', 'image']


admin.site.register(PostImage, PostImageAdmin)
