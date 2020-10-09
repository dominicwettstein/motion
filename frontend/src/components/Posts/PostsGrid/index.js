import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostTile from '../PostTile';
import { PostsGridContainer } from '../../../style/layout/grids';
import { apiPostDelete, apiPostToggleLike } from '../../../store/posts';
import PostCreatorTile from '../PostCreatorTile';
import { EmptyDBContainer } from '../../../style/components/status';
import PostEditorOverlay from '../PostEditorOverlay';
import Loader from '../../Shared/Loader';
import DialogConfirm from '../../Shared/DialogConfirm';

const PostsGrid = (props) => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user);
  const posts = props.posts;
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorData, setEditorData] = useState({});
  const [sharedData, setSharedData] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);

  const searchedPosts = (posts, searchTerm) => {
    if (searchTerm && searchTerm.length > 0) {
      let re = new RegExp(searchTerm, 'i');
      return posts.filter(
        (post) =>
          post.user.first_name.match(re) ||
          post.user.last_name.match(re) ||
          post.content.match(re)
      );
    } else {
      return posts;
    }
  };

  const openEditorEmpty = () => {
    setEditorData({});
    setEditorOpen(true);
  };

  const openEditorPost = (postData) => {
    if (postData) {
      setEditorData(postData);
      setEditorOpen(true);
    } else {
      console.log('invalid post data');
    }
  };

  const openEditorShare = (sharedData) => {
    setSharedData(sharedData);
    setEditorOpen(true);
    console.log('share');
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditorData({});
    setSharedData({});
  };

  const openDeleteDialog = (id) => {
    if (id) {
      setDeletePostId(id);
      setDeleteDialogOpen(true);
    } else {
      console.log('unknown post id');
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeletePostId(null);
  };

  const likePost = (id, content) => {
    dispatch(apiPostToggleLike(me.token, id, content));
  };

  return (
    <>
      {props.editable ? (
        <PostCreatorTile fnOpenEditor={openEditorEmpty}></PostCreatorTile>
      ) : (
        <></>
      )}
      {posts !== null && posts.length > 0 ? (
        <PostsGridContainer breakpointCols={2} columnClassName="masonry_column">
          {searchedPosts(posts, props.searchTerm).map((post) => (
            <PostTile
              key={post.id}
              postData={post}
              ownAvatar={me.userData.avatar}
              fnEditPost={openEditorPost}
              fnSharePost={openEditorShare}
              fnDeletePost={openDeleteDialog}
              fnLikePost={likePost}
            ></PostTile>
          ))}
        </PostsGridContainer>
      ) : (
        <EmptyDBContainer>
          {posts === null ? 'No posts in this category' : <Loader />}
        </EmptyDBContainer>
      )}

      {editorOpen ? (
        <PostEditorOverlay
          closeFn={closeEditor}
          oldPostData={editorData}
          sharedPostData={sharedData}
        ></PostEditorOverlay>
      ) : (
        <></>
      )}
      {deleteDialogOpen && deletePostId ? (
        <DialogConfirm
          question="Are you sure you want to delete this post?"
          fnCancel={closeDeleteDialog}
          fnConfirm={() => {
            dispatch(apiPostDelete(me.token, deletePostId));
            closeDeleteDialog();
          }}
        ></DialogConfirm>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostsGrid;
