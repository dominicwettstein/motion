import React from 'react';

import logo from '../../../assets/img/logo_main.svg';
import logo_apple from '../../../assets/img/logo_store_apple.svg';
import logo_google from '../../../assets/img/logo_store_google.svg';
import {
  AuthContentContainer,
  AuthHeaderContainer,
  AuthHeaderBranding,
  AuthHeaderFooter,
  AuthHeaderLogo,
  AuthHeaderLogoText,
  AuthHeaderClaim,
  AuthHeaderStoreWrapper,
  AuthHeaderSocial,
  AuthHeaderCopyright,
} from '../../../style/modules/authentication';
import { PageContainerAuth } from '../../../style/layout/pages';
import {
  ButtonOutlineWhite,
  ButtonIconWhite,
} from '../../../style/components/button';

const AuthPage = (props) => {
  return (
    <PageContainerAuth>
      <AuthHeaderContainer>
        <AuthHeaderBranding>
          <AuthHeaderLogo src={logo} />
          <AuthHeaderLogoText>Motion</AuthHeaderLogoText>
          <AuthHeaderClaim>
            Connect with friends and the world around you with Motion.
          </AuthHeaderClaim>
          <AuthHeaderStoreWrapper>
            <ButtonOutlineWhite>
              <img src={logo_apple} alt="Apple Store" />
            </ButtonOutlineWhite>
            <ButtonOutlineWhite>
              <img src={logo_google} alt="Google Play" />
            </ButtonOutlineWhite>
          </AuthHeaderStoreWrapper>
        </AuthHeaderBranding>
        <AuthHeaderFooter>
          <AuthHeaderSocial>
            <ButtonIconWhite>
              <i className="fab fa-twitter"></i>
            </ButtonIconWhite>
            <ButtonIconWhite>
              <i className="fab fa-facebook-f"></i>
            </ButtonIconWhite>
            <ButtonIconWhite>
              <i className="fab fa-instagram"></i>
            </ButtonIconWhite>
          </AuthHeaderSocial>
          <AuthHeaderCopyright>
            © Motion 2020. All rights reserved.
          </AuthHeaderCopyright>
        </AuthHeaderFooter>
      </AuthHeaderContainer>
      <AuthContentContainer>{props.children}</AuthContentContainer>
    </PageContainerAuth>
  );
};

export default AuthPage;
