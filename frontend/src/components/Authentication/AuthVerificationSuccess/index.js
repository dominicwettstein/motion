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

const AuthVerificationSuccess = () => {
  return (
    <>
      <FloatingButtonContainer></FloatingButtonContainer>
      <AuthFormContainer>
        <AuthFormContent>
          <CenteredH1>You have registered!</CenteredH1>
          <AuthFormGrid>
            <MegaStatusIcon></MegaStatusIcon>
            <AuthConfirmationText>
              You have successfully registered @Motion. Please go to login to
              start the adventure!
            </AuthConfirmationText>
          </AuthFormGrid>
        </AuthFormContent>
        <AuthFormFooter>
          <Link to="/login">
            <ButtonPrimaryLarge>Login</ButtonPrimaryLarge>
          </Link>
          <AuthFormProgressWrapper></AuthFormProgressWrapper>
        </AuthFormFooter>
      </AuthFormContainer>
    </>
  );
};

export default AuthVerificationSuccess;
