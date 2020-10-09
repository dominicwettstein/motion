import React from 'react';
import { Link } from 'react-router-dom';

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
import { MegaStatusIcon } from '../../../style/components/status';

const AuthPasswordResetSuccess = () => {
  return (
    <>
      <FloatingButtonContainer> </FloatingButtonContainer>
      <AuthFormContainer>
        <AuthFormContent>
          <CenteredH1> Password reset! </CenteredH1>
          <AuthFormGrid>
            <MegaStatusIcon></MegaStatusIcon>
            <AuthConfirmationText>
              Your password was successfully reset. Please go to login to get
              back into the adventure!
            </AuthConfirmationText>
          </AuthFormGrid>
        </AuthFormContent>
        <AuthFormFooter>
          <Link to="/login">
            <ButtonPrimaryLarge> Login </ButtonPrimaryLarge>
          </Link>
          <AuthFormProgressWrapper> </AuthFormProgressWrapper>
        </AuthFormFooter>
      </AuthFormContainer>
    </>
  );
};

export default AuthPasswordResetSuccess;
