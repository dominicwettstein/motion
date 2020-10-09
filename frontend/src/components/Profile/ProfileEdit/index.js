import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';

import {
  apiUserUpdateProfile,
  apiUserDeleteProfile,
} from '../../../store/user';
import {
  ProfileBackground,
  ProfileHeader,
  ProfileSummary,
  ProfileDetails,
  ProfileTagWrapper,
  ProfileTagAdder,
  ProfileSummaryActions,
  ProfileSummaryInfo,
  ProfileBannerButton,
  ProfileBannerButtonContainer,
  ProfileBannerButtonIcon,
} from '../../../style/modules/profile';
import { WidthController } from '../../../style/layout/pages';
import { AvatarLarge } from '../../../style/components/avatar';
import {
  ButtonOutline,
  ButtonPrimary,
  ButtonWrapper,
  FakeButtonOutline,
} from '../../../style/components/button';
import { Input, InputArea, HiddenInput } from '../../../style/components/input';
import {
  FormLabel,
  FormLabelText,
  FormField,
  FormFieldNoBorder,
} from '../../../style/components/form';
import { Tag, TagCloseButton } from '../../../style/components/tag';
import DialogConfirm from '../../Shared/DialogConfirm';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const profileServer = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.token);
  const [profileLocal, setProfile] = useState(profileServer);
  const [visibleAvatar, setVisibleAvatar] = useState(profileLocal.avatar);
  const [visibleBanner, setVisibleBanner] = useState(profileLocal.banner);
  const [newTag, setNewTag] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setProfile(profileServer);
    setVisibleAvatar(profileServer.avatar);
    setVisibleBanner(profileServer.banner);
  }, [profileServer]);

  const updateProfile = () => {
    const profileData = new FormData();
    profileData.append('username', profileLocal.username);
    profileData.append('first_name', profileLocal.first_name);
    profileData.append('last_name', profileLocal.last_name);
    profileData.append('email', profileLocal.email);
    profileData.append('location', profileLocal.location);
    profileData.append('about_me', profileLocal.about_me);
    profileData.append(
      'things_user_likes',
      JSON.stringify(profileLocal.things_user_likes)
    );
    if (profileLocal.avatar && typeof profileLocal.avatar !== 'string') {
      profileData.append('avatar', profileLocal.avatar);
    }
    if (profileLocal.banner && typeof profileLocal.banner !== 'string') {
      profileData.append('banner', profileLocal.banner);
    }

    dispatch(apiUserUpdateProfile(token, profileData));
  };

  const changeAvatar = (e) => {
    e.preventDefault();
    let newAvatar = e.target.files[0];
    if (newAvatar) {
      setProfile({ ...profileLocal, ...{ avatar: newAvatar } });
      setVisibleAvatar(URL.createObjectURL(newAvatar));
    }
  };

  // const deleteAvatar = () => {
  //   setProfile({ ...profileLocal, ...{ avatar: null } });
  //   setVisibleAvatar(null);
  // };

  const changeBanner = (e) => {
    e.preventDefault();
    let newBanner = e.target.files[0];
    if (newBanner) {
      setProfile({ ...profileLocal, ...{ banner: newBanner } });
      setVisibleBanner(URL.createObjectURL(newBanner));
    }
  };

  const addLike = (item) => {
    const updatedLikes = [...profileLocal.things_user_likes, item];
    setProfile({
      ...profileLocal,
      ...{ things_user_likes: updatedLikes },
    });
  };

  const removeLike = (item) => {
    const updatedLikes = profileLocal.things_user_likes.filter(
      (like) => like !== item
    );
    setProfile({
      ...profileLocal,
      ...{ things_user_likes: updatedLikes },
    });
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const onTagEdit = (e) => {
    e.preventDefault();
    setNewTag(e.target.value);
  };

  const onSubmitTag = (e) => {
    e.preventDefault();
    if (newTag) addLike(newTag);
    setNewTag('');
    e.target.reset();
  };

  const onFirstNameEdit = (e) => {
    e.preventDefault();
    setProfile({
      ...profileLocal,
      ...{ first_name: e.target.value },
    });
  };

  const onLastNameEdit = (e) => {
    e.preventDefault();
    setProfile({
      ...profileLocal,
      ...{ last_name: e.target.value },
    });
  };

  const onLocationEdit = (e) => {
    e.preventDefault();
    setProfile({
      ...profileLocal,
      ...{ location: e.target.value },
    });
  };

  const onEmailEdit = (e) => {
    e.preventDefault();
    setProfile({
      ...profileLocal,
      ...{ email: e.target.value },
    });
  };

  const onAboutEdit = (e) => {
    e.preventDefault();
    setProfile({
      ...profileLocal,
      ...{ about_me: e.target.value },
    });
  };

  return (
    <>
      <ProfileBackground file={visibleBanner}></ProfileBackground>
      <WidthController>
        <ProfileHeader>
          <ProfileBannerButtonContainer>
            <label>
              <ProfileBannerButton>
                <ProfileBannerButtonIcon></ProfileBannerButtonIcon>
                Change
              </ProfileBannerButton>
              <HiddenInput type="file" onChange={changeBanner}></HiddenInput>
            </label>
          </ProfileBannerButtonContainer>
          <ProfileSummary>
            <ProfileSummaryInfo>
              <AvatarLarge src={visibleAvatar}></AvatarLarge>
              <ButtonWrapper marginTop="16px">
                <label>
                  <FakeButtonOutline>
                    {profileLocal.avatar ? 'Change Image' : 'Add Image'}
                  </FakeButtonOutline>
                  <HiddenInput
                    type="file"
                    onChange={changeAvatar}
                  ></HiddenInput>
                </label>
              </ButtonWrapper>
              {/* <ButtonWrapper marginTop="16px">
                {profileLocal.avatar ? (
                  <ButtonOutline fullWidth onClick={deleteAvatar}>
                    Delete Image
                  </ButtonOutline>
                ) : (
                  <></>
                )}
              </ButtonWrapper> */}
            </ProfileSummaryInfo>
            <ProfileSummaryActions>
              <ButtonOutline fullWidth onClick={openDeleteDialog}>
                Delete Account
              </ButtonOutline>
              {JSON.stringify(profileLocal) !==
              JSON.stringify(profileServer) ? (
                <>
                  <ButtonPrimary fullWidth onClick={updateProfile}>
                    Update
                  </ButtonPrimary>
                </>
              ) : (
                <></>
              )}
            </ProfileSummaryActions>
          </ProfileSummary>
          <ProfileDetails>
            <FormField>
              <FormLabel>
                <FormLabelText>First Name</FormLabelText>
                <Input
                  type="text"
                  defaultValue={profileLocal.first_name}
                  onChange={onFirstNameEdit}
                />
              </FormLabel>
            </FormField>
            <FormField>
              <FormLabel>
                <FormLabelText>Last Name</FormLabelText>
                <Input
                  type="text"
                  defaultValue={profileLocal.last_name}
                  onChange={onLastNameEdit}
                />
              </FormLabel>
            </FormField>
            <FormField>
              <FormLabel>
                <FormLabelText>Email</FormLabelText>
                <Input
                  type="email"
                  defaultValue={profileLocal.email}
                  onChange={onEmailEdit}
                />
              </FormLabel>
            </FormField>
            <FormField>
              <FormLabel>
                <FormLabelText>Location</FormLabelText>
                <Input
                  type="text"
                  defaultValue={profileLocal.location}
                  onChange={onLocationEdit}
                />
              </FormLabel>
            </FormField>
            <FormField span="2">
              <FormLabel>
                <FormLabelText>About Me</FormLabelText>
                <InputArea
                  type="text"
                  rows="2"
                  defaultValue={profileLocal.about_me}
                  placeholder="Write something about yourself"
                  onChange={onAboutEdit}
                ></InputArea>
              </FormLabel>
            </FormField>
            <FormFieldNoBorder span="2">
              <FormLabel>
                <FormLabelText>Things I like</FormLabelText>
                <ProfileTagWrapper paddingTop>
                  {profileLocal.things_user_likes ? (
                    profileLocal.things_user_likes.map((like) => {
                      return (
                        <Tag key={uuidv1()}>
                          {like}
                          <TagCloseButton
                            onClick={(e) => {
                              e.preventDefault();
                              removeLike(like);
                            }}
                          >
                            
                          </TagCloseButton>
                        </Tag>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </ProfileTagWrapper>
                <ProfileTagAdder onSubmit={onSubmitTag}>
                  <FormField>
                    <Input
                      type="text"
                      placeholder="Type something..."
                      onChange={onTagEdit}
                    />
                  </FormField>
                  <ButtonOutline type="submit">Add</ButtonOutline>
                </ProfileTagAdder>
              </FormLabel>
            </FormFieldNoBorder>
          </ProfileDetails>
        </ProfileHeader>
      </WidthController>
      {deleteDialogOpen ? (
        <DialogConfirm
          question="Are you sure you want to delete your profile? This cannot be undone..."
          fnCancel={closeDeleteDialog}
          fnConfirm={() => {
            dispatch(apiUserDeleteProfile(token));
            closeDeleteDialog();
          }}
        >
          bla
        </DialogConfirm>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileEdit;
