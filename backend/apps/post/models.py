from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Post(models.Model):
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='posts',
        help_text="ID of author"
    )
    content = models.CharField(
        max_length=1200,
        help_text="String, max. 1200 char"
    )
    url = models.CharField(
        max_length=1000,
        help_text="Shared Link",
        blank=True
    )
    created = models.DateTimeField(
        auto_now_add=True,
        help_text="Creation date"
    )
    likes = models.ManyToManyField(
        to=User,
        related_name='liked_posts',
        blank=True,
        help_text="List of users who liked this post"
    )
    shared_post = models.ForeignKey(
        to='self',
        related_name="posts_sharing_me",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        help_text="ID of shared post"
    )

    # Print method for post
    def __str__(self):
        return f"{self.pk} - {self.user} - {self.content}"

    # Meta settings: return in chronological order (newest first)
    class Meta:
        ordering = ['-pk']

    # Helper functions
    def amount_of_likes(self):
        return self.likes.count()

    def amount_of_shares(self):
        return self.posts_sharing_me.count()
