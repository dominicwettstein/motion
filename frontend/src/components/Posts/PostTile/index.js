import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getCustomizedDate } from '../../../lib/helpers';
import { Tile } from '../../../style/components/tile';
import { Avatar, AvatarSmall } from '../../../style/components/avatar';
import {
  ButtonIcon,
  ButtonMixed,
  ButtonMixedIcon,
  ButtonFlyoutContainer,
  ButtonFlyout,
  ButtonFlyoutIcon,
  ButtonWrapper,
} from '../../../style/components/button';
import {
  PostContainer,
  PostHeaderContainer,
  PostMetaContainer,
  PostSettingsWrapper,
  PostMainText,
  PostFooter,
  PostMetaName,
  PostMetaTimestamp,
  PostFooterCounter,
  PostContainerShared,
  PostSharedAddendum,
  PostFooterActions,
  PostFooterCounterWrapper,
  PostCommentsWrapper,
  PostComment,
  PostCommentContent,
} from '../../../style/modules/post';
import PostTileGallery from '../PostTileGallery';
import PostCommentor from '../PostCommentor';
import { LinkPreview } from '../../../style/components/link';

const PostTile = (props) => {
  const { push } = useHistory();
  const [commentEdit, setCommentEdit] = useState(false);

  const toggleCommentEdit = () => {
    setCommentEdit(!commentEdit);
  };

  return (
    <Tile>
      <PostContainer>
        <PostHeaderContainer>
          <Avatar
            src={props.postData.user.avatar}
            onClick={() => push(`/profile/${props.postData.user.id}`)}
            title={`View ${props.postData.user.first_name}'s profile`}
          ></Avatar>
          <PostMetaContainer>
            <PostMetaName>
              {props.postData.user.first_name} {props.postData.user.last_name}
            </PostMetaName>
            <PostMetaTimestamp>
              {getCustomizedDate(props.postData.created)}
            </PostMetaTimestamp>
          </PostMetaContainer>
          <PostSharedAddendum>
            {props.postData.shared_post !== null ? <>shared a post</> : <></>}
          </PostSharedAddendum>
          <PostSettingsWrapper>
            {props.postData.is_from_logged_in_user ? (
              <ButtonWrapper marginRight="-8px">
                <ButtonIcon></ButtonIcon>
                <ButtonFlyoutContainer>
                  <ButtonFlyout
                    onClick={() => props.fnEditPost(props.postData)}
                  >
                    <ButtonFlyoutIcon></ButtonFlyoutIcon>Edit
                  </ButtonFlyout>
                  <ButtonFlyout
                    onClick={() => props.fnDeletePost(props.postData.id)}
                  >
                    <ButtonFlyoutIcon></ButtonFlyoutIcon>Delete
                  </ButtonFlyout>
                </ButtonFlyoutContainer>
              </ButtonWrapper>
            ) : (
              <></>
            )}
          </PostSettingsWrapper>
        </PostHeaderContainer>
        <PostMainText>{props.postData.content}</PostMainText>
        {props.postData.images.length > 0 ? (
          <PostTileGallery images={props.postData.images}></PostTileGallery>
        ) : (
          <></>
        )}
        {props.postData.url !== '' ? (
          <LinkPreview url={props.postData.url} autoPlay="true" />
        ) : (
          <></>
        )}
        {props.postData.shared_post !== null ? (
          <PostContainerShared>
            <PostContainer>
              <PostHeaderContainer>
                <Avatar
                  src={props.postData.shared_post.user.avatar}
                  onClick={() =>
                    push(`/profile/${props.postData.shared_post.user.id}`)
                  }
                  title={`View ${props.postData.shared_post.user.first_name}'s profile`}
                ></Avatar>
                <PostMetaContainer>
                  <PostMetaName>
                    {props.postData.shared_post.user.first_name}{' '}
                    {props.postData.shared_post.user.last_name}
                  </PostMetaName>
                  <PostMetaTimestamp>
                    {getCustomizedDate(props.postData.shared_post.created)}
                  </PostMetaTimestamp>
                </PostMetaContainer>
                <PostSettingsWrapper></PostSettingsWrapper>
              </PostHeaderContainer>
              <PostMainText>{props.postData.shared_post.content}</PostMainText>
              {props.postData.shared_post.images.length > 0 ? (
                <PostTileGallery
                  images={props.postData.shared_post.images}
                ></PostTileGallery>
              ) : (
                <></>
              )}
              {props.postData.shared_post.url !== '' ? (
                <LinkPreview url={props.postData.shared_post.url} />
              ) : (
                <></>
              )}
            </PostContainer>
          </PostContainerShared>
        ) : (
          <></>
        )}
        {props.postData.comments.length > 0 || commentEdit ? (
          <PostCommentsWrapper>
            {props.postData.comments.map((comment) => {
              return (
                <PostComment key={comment.id}>
                  <AvatarSmall
                    src={comment.user.avatar}
                    onClick={() => push(`/profile/${comment.user.id}`)}
                    title={`View ${comment.user.first_name}'s profile`}
                  ></AvatarSmall>
                  <PostCommentContent>{comment.content}</PostCommentContent>
                </PostComment>
              );
            })}
            {commentEdit ? (
              <PostComment>
                <PostCommentor
                  fnCloseEditor={toggleCommentEdit}
                  postID={props.postData.id}
                ></PostCommentor>
              </PostComment>
            ) : (
              <></>
            )}
          </PostCommentsWrapper>
        ) : (
          <></>
        )}
        <PostFooter>
          <PostFooterActions>
            {!props.postData.is_from_logged_in_user ? (
              <>
                <ButtonMixed
                  onClick={() =>
                    props.fnLikePost(props.postData.id, props.postData.content)
                  }
                >
                  <ButtonMixedIcon
                    isActive={props.postData.logged_in_user_liked}
                  >
                    
                  </ButtonMixedIcon>
                  {props.postData.logged_in_user_liked ? 'Unlike' : 'Like'}
                </ButtonMixed>
                <ButtonMixed onClick={() => props.fnSharePost(props.postData)}>
                  <ButtonMixedIcon></ButtonMixedIcon>Share
                </ButtonMixed>
                <ButtonMixed onClick={toggleCommentEdit}>
                  <ButtonMixedIcon></ButtonMixedIcon>Comment
                </ButtonMixed>
              </>
            ) : (
              <></>
            )}
          </PostFooterActions>
          <PostFooterCounterWrapper>
            <PostFooterCounter>
              {props.postData.amount_of_likes} Likes
            </PostFooterCounter>
          </PostFooterCounterWrapper>
        </PostFooter>
      </PostContainer>
    </Tile>
  );
};

export default PostTile;
