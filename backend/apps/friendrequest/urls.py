from django.urls import path

from .views import ListFriends, ListFriendRequests, RetrieveUpdateDestroyFriendRequest, CreateFriendRequest

urlpatterns = [
    path('', ListFriends.as_view()),
    path('request/<int:user_id>/', CreateFriendRequest.as_view()),
    path('requests/', ListFriendRequests.as_view()),
    path('requests/<int:pk>/', RetrieveUpdateDestroyFriendRequest.as_view()),
]
