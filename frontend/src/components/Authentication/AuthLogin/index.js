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
  AuthFormContent,
  AuthFormFooter,
  AuthFormProgressWrapper,
  AuthFormGrid,
} from '../../../style/modules/authentication';
import { StatusMessage } from '../../../style/components/status';
import { SmallLink } from '../../../style/components/link';
import { apiUserLogin, userSetStatus } from '../../../store/user';
import { OverlayLoad } from '../../../style/components/overlay';
import Loader from '../../Shared/Loader';

const AuthLogin = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { token, actionStatusOK, actionStatusMessage } = useSelector(
    (state) => state.user
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitForm = (e) => {
    e.preventDefault();
    e.target.reset();
    dispatch(userSetStatus(true, ''));
    dispatch(apiUserLogin(email, password));
    setLoading(true);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPwdChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (token) {
      push('/posts');
      dispatch(userSetStatus(true, ''));
    }
  }, [token, push, dispatch]);

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
        <>Don't have an account yet?</>
        <Link to="/sign-up" onClick={() => dispatch(userSetStatus(true, ''))}>
          <ButtonOutline hasMarginLeft>Sign up</ButtonOutline>
        </Link>
      </FloatingButtonContainer>
      <AuthFormContainer onSubmit={onSubmitForm}>
        <AuthFormContent>
          <CenteredH1>Sign in</CenteredH1>
          <AuthFormGrid>
            <FormField>
              <FormFieldIcon></FormFieldIcon>
              <FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={onEmailChange}
                />
              </FormLabel>
            </FormField>
            <FormField>
              <FormFieldIcon></FormFieldIcon>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={onPwdChange}
              />
            </FormField>
            {!actionStatusOK ? (
              <StatusMessage>{actionStatusMessage}</StatusMessage>
            ) : (
              <></>
            )}
          </AuthFormGrid>
        </AuthFormContent>
        <AuthFormFooter>
          <ButtonPrimaryLarge type="submit">Sign in</ButtonPrimaryLarge>
          <AuthFormProgressWrapper>
            <SmallLink to="/password-reset">FORGOT PASSWORD?</SmallLink>
          </AuthFormProgressWrapper>
        </AuthFormFooter>
      </AuthFormContainer>
    </>
  );
};

export default AuthLogin;
