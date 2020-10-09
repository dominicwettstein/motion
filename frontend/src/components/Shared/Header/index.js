import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import logo from '../../../assets/img/logo_header.png';
import {
  HeaderContainer,
  NavContainer,
  SiteLogoLink,
  ProfileArea,
  SiteLogo,
  SiteLogoText,
  NavItem,
  NavItemIcon,
} from '../../../style/modules/header';
import {
  ButtonIcon,
  ButtonIconBadge,
  ButtonFlyoutContainer,
  ButtonFlyout,
  ButtonFlyoutIcon,
  ButtonWrapper,
} from '../../../style/components/button';
import { Avatar } from '../../../style/components/avatar';
import AlertFlyout from './AlertFlyout';

const Header = () => {
  const { push } = useHistory();
  const me = useSelector((state) => state.user);
  const avatar = me.userData.avatar;
  const pendingRequests = me.requests.filter(
    (request) => request.status !== 'A'
  );

  const logMeOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <HeaderContainer>
      <SiteLogoLink to="/">
        <SiteLogo src={logo}></SiteLogo>
        <SiteLogoText>Motion</SiteLogoText>
      </SiteLogoLink>
      <NavContainer>
        <NavItem to="/posts">
          <NavItemIcon></NavItemIcon>Posts
        </NavItem>
        <NavItem to="/users">
          <NavItemIcon></NavItemIcon>Find Friends
        </NavItem>
      </NavContainer>
      <ProfileArea>
        <ButtonWrapper marginRight="32px">
          <ButtonIcon>
            
            {pendingRequests.length > 0 ? (
              <ButtonIconBadge>{pendingRequests.length}</ButtonIconBadge>
            ) : (
              <></>
            )}
          </ButtonIcon>
          <ButtonFlyoutContainer>
            <AlertFlyout></AlertFlyout>
          </ButtonFlyoutContainer>
        </ButtonWrapper>
        <Avatar
          src={avatar}
          onClick={() => push(`/profile/${me.userData.id}`)}
        />
        <ButtonWrapper marginLeft="8px">
          <ButtonIcon></ButtonIcon>
          <ButtonFlyoutContainer>
            <ButtonFlyout onClick={() => push('/profile-edit')}>
              <ButtonFlyoutIcon></ButtonFlyoutIcon>
              Edit Profile
            </ButtonFlyout>
            <ButtonFlyout onClick={() => logMeOut()}>
              <ButtonFlyoutIcon></ButtonFlyoutIcon>Log out
            </ButtonFlyout>
          </ButtonFlyoutContainer>
        </ButtonWrapper>
      </ProfileArea>
    </HeaderContainer>
  );
};

export default Header;
