from django.db import models

from apps.post.models import Post
from apps.user.models import User


class PostComment(models.Model):
    post = models.ForeignKey(
        to=Post,
        on_delete=models.CASCADE,
        related_name='comments',
        help_text="Post that the comment refers to"
    )
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='comments',
        help_text="User that made the comment"
    )
    content = models.CharField(
        max_length=1200,
        help_text="String, max. 1200 characters"
    )

    # Print method for comment
    def __str__(self):
        return f"{self.pk} - {self.content} - {self.user} - {self.post}"
