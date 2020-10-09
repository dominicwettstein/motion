import os

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    username = models.CharField(
        max_length=80,
        help_text="String, max. 80 char",
        blank=True,
        unique=True
    )
    first_name = models.CharField(
        max_length=80,
        help_text="String, max. 80 char",
        blank=True
    )
    last_name = models.CharField(
        max_length=80,
        help_text="String, max. 80 char",
        blank=True
    )
    email = models.EmailField(unique=True)
    code = models.CharField(
        max_length=6,
        blank=True,
        help_text="Code sent via e-mail"
    )
    location = models.CharField(
        max_length=120,
        blank=True,
        help_text="String"
    )
    about_me = models.CharField(
        max_length=480,
        blank=True,
        help_text="String"
    )
    avatar = models.ImageField(
        upload_to="users-avatars",
        blank=True,
        help_text="Image"
    )
    banner = models.ImageField(
        upload_to="users-banners",
        blank=True,
        help_text="Image"
    )
    things_user_likes = models.CharField(
        max_length=800,
        blank=True,
        help_text="List of Strings"
    )
    following = models.ManyToManyField(
        to='self',
        symmetrical=False,
        related_name='followers',
        blank=True
    )

    # Print representation
    def __str__(self):
        return f'{self.pk} - {self.username}'

    # Helper functions for display
    def amount_following(self):
        return self.following.count()

    def amount_of_followers(self):
        return self.followers.count()

    def amount_of_posts(self):
        return self.posts.count()

    def friends(self):
        sent_accepted = self.requests_sent.filter(status="A").all()
        received_accepted = self.requests_received.filter(status="A").all()
        return [request.receiver for request in sent_accepted] + [request.requester for request in received_accepted]

    def amount_of_friends(self):
        return len(self.friends())

    def amount_of_likes(self):
        return self.liked_posts.count()


@receiver(models.signals.pre_save, sender=User)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `User` object is updated
    with new file.
    """
    if not instance.pk:
        return False

    try:
        old_user_data = User.objects.get(pk=instance.pk)
    except User.DoesNotExist:
        return False

    old_avatar = old_user_data.avatar
    old_banner = old_user_data.banner

    if old_avatar and not old_avatar == instance.avatar:
        if os.path.isfile(old_avatar.path):
            os.remove(old_avatar.path)

    if old_banner and not old_banner == instance.banner:
        if os.path.isfile(old_banner.path):
            os.remove(old_banner.path)
