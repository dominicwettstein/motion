import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Axios from '../../../axios';
import { v1 as uuidv1 } from 'uuid';

import {
  ProfileBackground,
  ProfileHeader,
  ProfileSummary,
  ProfileSummaryInfo,
  ProfileSummaryActions,
  ProfileSummaryUserName,
  ProfileSummaryUserLocation,
  ProfileDetails,
  ProfileDetailBlock,
  ProfileDetailBlockTitle,
  ProfileDetailsWrapper,
  ProfileTagWrapper,
} from '../../../style/modules/profile';
import { WidthController } from '../../../style/layout/pages';
import { ButtonOutline } from '../../../style/components/button';
import { AvatarLarge } from '../../../style/components/avatar';
import { EmptyDBContainer } from '../../../style/components/status';
import ProfileNavi from '../ProfileNavi';
import Loader from '../../Shared/Loader';
import FriendButton from '../../Shared/FriendButton';
import FollowButton from '../../Shared/FollowButton';
import UserGrid from '../../User/UserGrid';
import PostsGrid from '../../Posts/PostsGrid';
import { Tag } from '../../../style/components/tag';

const ProfileRead = () => {
  const { push } = useHistory();
  const { id } = useParams();
  const me = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState({});
  const [userPostsLiked, setUserPostsLiked] = useState({});
  const [viewFilter, setViewFilter] = useState('Posts');

  const getUserInfo = (id) => {
    const url = `users/${id}/`;
    const auth = 'Bearer ' + me.token;
    const headers = { headers: { Authorization: auth } };

    Axios.get(url, headers)
      .then((response) => {
        const profileInfo = response.data;
        profileInfo.friends =
          profileInfo.friends.length === 0 ? null : profileInfo.friends;
        profileInfo.followers =
          profileInfo.followers.length === 0 ? null : profileInfo.followers;
        profileInfo.following =
          profileInfo.following.length === 0 ? null : profileInfo.following;
        setUserProfile(profileInfo);
        console.log('Profile retrieved');
      })
      .catch((error) => {
        console.log('getUserInfo', error.data);
      });
  };

  const getUserPosts = (id) => {
    const url = `social/posts/user/${id}/`;
    const auth = 'Bearer ' + me.token;
    const headers = { headers: { Authorization: auth } };

    Axios.get(url, headers)
      .then((response) => {
        setUserPosts(response.data.length === 0 ? null : response.data);
        console.log('Posts retrieved');
      })
      .catch((error) => {
        console.log('getUserPosts', error.data);
      });
  };

  const getUserPostsLiked = (id) => {
    const url = `social/posts/user/${id}/liked/`;
    const auth = 'Bearer ' + me.token;
    const headers = { headers: { Authorization: auth } };

    Axios.get(url, headers)
      .then((response) => {
        setUserPostsLiked(response.data.length === 0 ? null : response.data);
        console.log('Liked posts retrieved');
      })
      .catch((error) => {
        console.log('getUserPostsLiked', error.data);
      });
  };

  const getUserDetail = () => {
    switch (viewFilter) {
      case 'Posts':
        return <PostsGrid posts={userPosts}></PostsGrid>;
      case 'Likes':
        return <PostsGrid posts={userPostsLiked}></PostsGrid>;
      case 'Friends':
        return <UserGrid users={userProfile.friends}></UserGrid>;
      case 'Followers':
        return <UserGrid users={userProfile.followers}></UserGrid>;
      case 'Following':
        return <UserGrid users={userProfile.following}></UserGrid>;
      default:
        return 'unkonwn filter';
    }
  };

  useEffect(() => {
    if (id && me.token) {
      getUserInfo(id);
      getUserPosts(id);
      getUserPostsLiked(id);
    }
  }, [id, me.token, me.followers, me.following, me.friends]);

  return (
    <>
      {Object.keys(userProfile).length > 0 ? (
        <>
          <ProfileBackground file={userProfile.banner}></ProfileBackground>
          <WidthController>
            <ProfileHeader>
              <ProfileSummary>
                <ProfileSummaryInfo>
                  <AvatarLarge src={userProfile.avatar}></AvatarLarge>
                  <ProfileSummaryUserName>
                    {userProfile.first_name} {userProfile.last_name}
                  </ProfileSummaryUserName>
                  <ProfileSummaryUserLocation>
                    {userProfile.location}
                  </ProfileSummaryUserLocation>
                </ProfileSummaryInfo>
                {userProfile.id === me.userData.id ? (
                  <ProfileSummaryActions>
                    <ButtonOutline
                      fullWidth
                      onClick={() => push('/profile-edit')}
                    >
                      Edit Profile
                    </ButtonOutline>
                  </ProfileSummaryActions>
                ) : (
                  <ProfileSummaryActions>
                    <FollowButton
                      following={me.following}
                      ownUserName={me.userData.username}
                      otherID={userProfile.id}
                      token={me.token}
                    ></FollowButton>
                    <FriendButton
                      requests={me.requests}
                      ownID={me.userData.id}
                      otherID={userProfile.id}
                      token={me.token}
                    ></FriendButton>
                  </ProfileSummaryActions>
                )}
              </ProfileSummary>
              <ProfileDetailsWrapper>
                <ProfileDetails>
                  <ProfileDetailBlock>
                    <ProfileDetailBlockTitle>About</ProfileDetailBlockTitle>
                    <p>{userProfile.about_me}</p>
                  </ProfileDetailBlock>
                  <ProfileDetailBlock>
                    <ProfileDetailBlockTitle>
                      Things I like
                    </ProfileDetailBlockTitle>
                    {userProfile.things_user_likes.length > 0 ? (
                      <ProfileTagWrapper>
                        {userProfile.things_user_likes.map((thing) => (
                          <Tag key={uuidv1()}>{thing}</Tag>
                        ))}
                      </ProfileTagWrapper>
                    ) : (
                      '-'
                    )}
                  </ProfileDetailBlock>
                </ProfileDetails>
                <ProfileNavi
                  categories={{
                    Posts: userProfile.amount_of_posts,
                    Likes: userProfile.amount_of_likes,
                    Friends: userProfile.amount_of_friends,
                    Followers: userProfile.amount_of_followers,
                    Following: userProfile.amount_following,
                  }}
                  activeFilter={viewFilter}
                  fnSetFilter={setViewFilter}
                ></ProfileNavi>
              </ProfileDetailsWrapper>
            </ProfileHeader>
            {getUserDetail()}
          </WidthController>
        </>
      ) : (
        <EmptyDBContainer>
          <Loader />
        </EmptyDBContainer>
      )}
    </>
  );
};

export default ProfileRead;
