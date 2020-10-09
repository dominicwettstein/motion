from django.db import models

from apps.user.models import User


class FriendRequest(models.Model):
    STATUS_CHOICES = [
        ('P', "Pending"),
        ('A', "Accepted"),
        ('R', "Rejected")
    ]

    requester = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='requests_sent',
        help_text='User that made friend request'
    )
    receiver = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='requests_received',
        help_text='User that received friend request'
    )
    status = models.CharField(
        max_length=1,
        default="P",
        choices=STATUS_CHOICES,
        help_text='Status of friend request (A:Accepted, P:Pending, R:Rejected)'
    )
    created = models.DateTimeField(
        auto_now_add=True,
        help_text='Creation date of friend request'
    )

    # Print method for request
    def __str__(self):
        return f"{self.pk} - {self.status} - {self.requester.pk} - {self.receiver.pk}"
