from django.urls import path

from .views import ListCreatePostComment

urlpatterns = [
    path('<int:post_id>/', ListCreatePostComment.as_view()),
]
