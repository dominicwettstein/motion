import os

from django.db import models
from django.dispatch import receiver

from apps.post.models import Post


class PostImage(models.Model):
    post = models.ForeignKey(
        to=Post,
        on_delete=models.CASCADE,
        related_name='images',
        help_text="Post that the image belongs to"
    )
    image = models.ImageField(
        upload_to="posts-images",
        help_text="Image file (url)"
    )

    # Print method for image
    def __str__(self):
        return f"{self.pk} - {self.image}"


@receiver(models.signals.post_delete, sender=PostImage)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `PostImage` object is deleted.
    """
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
