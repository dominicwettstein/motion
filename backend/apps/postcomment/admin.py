from django.contrib import admin

from .models import PostComment


class PostCommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'content', 'post', 'user']
    search_fields = ['content', 'user']


admin.site.register(PostComment, PostCommentAdmin)
