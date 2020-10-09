import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Input } from '../../../style/components/input';
import {
  FormField,
  FormFieldIcon,
  FormLabel,
} from '../../../style/components/form';
import {
  ButtonPrimaryLarge,
  ButtonOutline,
} from '../../../style/components/button';
import { CenteredH1 } from '../../../style/typography';
import {
  FloatingButtonContainer,
  AuthFormContainer,
  AuthFormGrid,
  AuthFormFooter,
  AuthFormProgressWrapper,
  AuthFormContent,
} from '../../../style/modules/authentication';
import { StatusMessage, ProgressDot } from '../../../style/components/status';
import { OverlayLoad } from '../../../style/components/overlay';
import Loader from '../../Shared/Loader';

import { apiUserSignUp, userSetStatus } from '../../../store/user';

const AuthSignUp = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { signUpOK, actionStatusOK, actionStatusMessage } = useSelector(
    (state) => state.user
  );
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitForm = (e) => {
    e.preventDefault();
    e.target.reset();
    dispatch(userSetStatus(true, ''));
    dispatch(apiUserSignUp(email));
    setLoading(true);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (signUpOK) push('/sign-up-success');
  }, [signUpOK, push]);

  return (
    <>
      {loading && actionStatusOK ? (
        <OverlayLoad>
          <Loader />
        </OverlayLoad>
      ) : (
        <></>
      )}
      <FloatingButtonContainer>
        <>Already have an account?</>
        <Link to="/login" onClick={() => dispatch(userSetStatus(true, ''))}>
          <ButtonOutline hasMarginLeft>Sign in</ButtonOutline>
        </Link>
      </FloatingButtonContainer>
      <AuthFormContainer onSubmit={onSubmitForm}>
        <AuthFormContent>
          <CenteredH1>Sign up</CenteredH1>
          <AuthFormGrid>
            <FormField>
              <FormFieldIcon></FormFieldIcon>
              <FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  onChange={onEmailChange}
                />
              </FormLabel>
            </FormField>
            {!actionStatusOK ? (
              <StatusMessage>{actionStatusMessage}</StatusMessage>
            ) : (
              <></>
            )}
          </AuthFormGrid>
        </AuthFormContent>
        <AuthFormFooter>
          <ButtonPrimaryLarge type="submit">Continue</ButtonPrimaryLarge>
          <AuthFormProgressWrapper>
            <ProgressDot isActive />
            <ProgressDot />
            <ProgressDot />
          </AuthFormProgressWrapper>
        </AuthFormFooter>
      </AuthFormContainer>
    </>
  );
};

export default AuthSignUp;
