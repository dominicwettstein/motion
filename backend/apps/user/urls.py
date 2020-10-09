from django.urls import path

from .views import ListUsers, RetrieveUpdateDestroyMe, RetrieveUser

urlpatterns = [
    path('', ListUsers.as_view()),
    path('<int:pk>/', RetrieveUser.as_view()),
    path('me/', RetrieveUpdateDestroyMe.as_view()),
]
