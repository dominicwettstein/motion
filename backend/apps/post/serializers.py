from rest_framework import serializers

from apps.postcomment.serializers import PostCommentSerializerInPost
from apps.postimage.serializers import PostImageSerializer
from apps.user.serializers import UserSerializerMinimal

from .models import Post


class SharedPostSerializer(serializers.ModelSerializer):
    """
    Post serializer when shared in other post
    """

    images = PostImageSerializer(many=True)
    user = UserSerializerMinimal()

    class Meta:
        model = Post
        fields = ['id', 'content', 'created', 'user', 'images', 'url']


class PostSerializer(serializers.ModelSerializer):
    """
    Default post serializer for get requests.
    """

    shared_post = SharedPostSerializer()
    user = UserSerializerMinimal()
    images = PostImageSerializer(many=True)
    comments = PostCommentSerializerInPost(many=True)
    logged_in_user_liked = serializers.SerializerMethodField()
    is_from_logged_in_user = serializers.SerializerMethodField()

    def get_logged_in_user_liked(self, post):
        return self.context['request'].user in post.likes.all()

    def get_is_from_logged_in_user(self, post):
        return self.context['request'].user == post.user

    class Meta:
        model = Post
        fields = ['id', 'content', 'created', 'user', 'url', 'amount_of_likes', 'amount_of_shares', 'images', 'shared_post',
                  'comments', 'logged_in_user_liked', 'is_from_logged_in_user']
        read_only_fields = ['id', 'user', 'created', 'amount_of_likes', 'amount_of_shares', 'comments',
                            'logged_in_user_liked', 'is_from_logged_in_user']


class PostSerializerCreateUpdate(serializers.ModelSerializer):
    """
    Serializer for create/update requests
    Special stuff for image upload
    """

    images = serializers.SerializerMethodField()

    def get_images(self, post):
        """
        Function handling the upload of multiple images to a post.
        """

        # If images in request, delete old images and create new ones
        request_images = self.context['request'].data.getlist('images')
        if request_images:
            # delete old images
            for image in post.images.all():
                image.delete()

            # create new images
            for image in request_images:
                img_data = {
                    'post': post.pk,
                    'image': image
                }
                new_image = PostImageSerializer(data=img_data)
                new_image.is_valid(raise_exception=True)
                new_image.save()

        serialized = PostImageSerializer(data=post.images.all(), many=True)
        serialized.is_valid()
        return serialized.data

    class Meta:
        model = Post
        fields = ['id', 'content', 'shared_post', 'images', 'url']
        read_only_fields = ['id']
