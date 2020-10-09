from django.urls import path

from apps.user.views import ToggleFollowUser, ListFollowing, ListFollowers

# Note: Follower is just a dummy url container (to comply with motion requirements);
# views actually come from User

urlpatterns = [
    path('following/', ListFollowing.as_view()),
    path('followers/', ListFollowers.as_view()),
    path('toggle-follow/<int:pk>/', ToggleFollowUser.as_view()),
]
