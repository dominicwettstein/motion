# Motion Backend

## General functionality:
- Added API docs
- E-mails are sent when:
    - User has a new follower
    - User has a new friend request
    - Request was accepted/rejected
    - Friend makes a post
- Specialty: In order to prevent data explosion, uploaded user pictures (profile, posts) are automatically deleted when their model instance is deleted, resp. when new pictures are uploaded

## Endpoints:
```
- Auth
    - api/auth/registration/ POST: Create new user with e-mail
    - api/auth/registration/validation/ PATCH: Validate user data with code
    - api/auth/password-reset/ POST: Get code for password reset
    - api/auth/password-reset/validation PATCH: Update password with code 
    - api/token/ -> jwt token functionality
- User
    - api/users/ GET: Get all the users
    - api/users/?search=<str:search_string> GET: Search users (username, firstname, lastname)
    - api/users/<int:user_id>/ GET: Get specific user profile (full data)
    - api/users/me/ GET: Get logged in user’s profile
    - api/users/me/ PATCH: Update the logged in user’s profile (including avatar, banner, things_user_likes)
    - api/users/me/ DELETE: Delete the logged in user
- Follower
    - api/social/followers/toggle-follow/<int:user_id>/ POST: Toggle follow/unfollow a user
    - api/social/followers/followers/ GET: List of all the logged in user’s followers
    - api/social/followers/following/ GET: List of all the people the current logged in user is following
- Post
    - api/social/posts/ POST: user can create a new post by sending post data
    - api/social/posts/ GET: lists all the posts of all users in chronological order
    - api/social/posts/?search=<str:search_string> GET: Search posts of all users (title, text) and list results in chronological order
    - api/social/posts/<int:post_id>/ GET: get a specific post by ID and display all the information about that post
    - api/social/posts/<int:post_id>/ PATCH: update a specific post (only allow owner of post or superuser)
    - api/social/posts/<int:post_id>/ DELETE: delete a post by ID (only allow owner of post or superuser)
    - api/social/posts/user/<int:user_id>/ GET: lists all the posts of a specific user in chronological order
    - api/social/posts/following/ GET: lists all the posts of followed users in chronological order
    - api/social/posts/likes/ GET: the list of the posts the user likes
    - api/social/posts/friends/ GET: lists all the posts of the logged in user’s friends in chronological order
    - api/social/posts/me/ GET: the list of posts of the logged in user
    - api/social/posts/toggle-like/int:post_id>/ POST: Toggle like a post
- Friends
    - api/social/friends/request/<int:user_id>/ POST: Send friend request to another user
    - api/social/friends/requests/<int:friend_request_id>/ GET: Get details of a friend request
    - api/social/friends/requests/<int:friend_request_id>/ PATCH: Accept or Reject an open friend request
    - api/social/friends/requests/<int:friend_request_id>/ DELETE: Delete a friend request
    - api/social/friends/ GET: List all accepted friends
- Comments
    - api/social/comments/<int:post_id>/ POST: Create a new comment on a post.
    - api/social/comments/<int:post_id>/ GET: List all comments of a post
```
