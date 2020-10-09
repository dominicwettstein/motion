from django.urls import path

from .views import ListCreatePost, RetrieveUpdateDestroyPost, ToggleLikePost, ListFollowingPosts, ListLikedPosts, \
    ListUserPosts, ListMyPosts, ListFriendsPost, ListUserPostsLiked

urlpatterns = [
    path('', ListCreatePost.as_view()),
    path('<int:pk>/', RetrieveUpdateDestroyPost.as_view()),
    path('toggle-like/<int:pk>/', ToggleLikePost.as_view()),
    path('me/', ListMyPosts.as_view()),
    path('likes/', ListLikedPosts.as_view()),
    path('following/', ListFollowingPosts.as_view()),
    path('friends/', ListFriendsPost.as_view()),
    path('user/<int:pk>/', ListUserPosts.as_view()),
    path('user/<int:pk>/liked/', ListUserPostsLiked.as_view()),
]
