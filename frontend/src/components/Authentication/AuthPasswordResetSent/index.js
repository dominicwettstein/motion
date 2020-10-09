import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ButtonPrimaryLarge } from '../../../style/components/button';
import { CenteredH1 } from '../../../style/typography';
import {
  FloatingButtonContainer,
  AuthFormContainer,
  AuthFormGrid,
  AuthFormFooter,
  AuthFormProgressWrapper,
  AuthFormContent,
  AuthConfirmationText,
} from '../../../style/modules/authentication';
import { ProgressDot, MegaStatusIcon } from '../../../style/components/status';

const AuthPasswordResetSent = () => {
  const email = useSelector((state) => state.user.pwResetEmail);

  return (
    <>
      <FloatingButtonContainer> </FloatingButtonContainer>
      <AuthFormContainer>
        <AuthFormContent>
          <CenteredH1> Code sent </CenteredH1>
          <AuthFormGrid>
            <MegaStatusIcon></MegaStatusIcon>
            <AuthConfirmationText>
              We've sent a confirmation code to
              {email ? ' ' + email : ' your e-mail address'}. Continue when you
              received the code.
            </AuthConfirmationText>
          </AuthFormGrid>
        </AuthFormContent>
        <AuthFormFooter>
          <Link to="/password-reset-new">
            <ButtonPrimaryLarge> Continue </ButtonPrimaryLarge>
          </Link>
          <AuthFormProgressWrapper>
            <ProgressDot />
            <ProgressDot isActive />
            <ProgressDot />
          </AuthFormProgressWrapper>
        </AuthFormFooter>
      </AuthFormContainer>
    </>
  );
};

export default AuthPasswordResetSent;
