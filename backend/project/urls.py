from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    # Admin panel
    path('backend/admin/', admin.site.urls),
    # Documentation
    path('backend/api/docs/', include_docs_urls(title='Motion API (Dominic)', public=True, permission_classes=[])),
    # Auth and registration stuff
    path('backend/api/auth/', include('apps.registration.urls')),
    # User stuff
    path('backend/api/users/', include('apps.user.urls')),
    # Followers stuff (fake model to comply with social url)
    path('backend/api/social/followers/', include('apps.follower.urls')),
    # Friends stuff
    path('backend/api/social/friends/', include('apps.friendrequest.urls')),
    # Post stuff
    path('backend/api/social/posts/', include('apps.post.urls')),
    # Comments stuff
    path('backend/api/social/comments/', include('apps.postcomment.urls')),
]
