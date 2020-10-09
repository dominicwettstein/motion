from django.contrib import admin

from .models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'content', 'amount_of_likes', 'amount_of_shares']
    search_fields = ['content', 'user']
    list_filter = ['user']


admin.site.register(Post, PostAdmin)
