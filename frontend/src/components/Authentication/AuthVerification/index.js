import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { Input } from '../../../style/components/input';
import {
  FormField,
  FormLabel,
  FormLabelText,
} from '../../../style/components/form';
import {
  ButtonPrimaryLarge,
  ButtonOutline,
} from '../../../style/components/button';
import { CenteredH1 } from '../../../style/typography';
import {
  FloatingButtonContainer,
  AuthFormContainer,
  AuthFormFooter,
  AuthFormProgressWrapper,
  AuthFormContent,
  AuthFormGridDouble,
} from '../../../style/modules/authentication';
import { StatusMessage, ProgressDot } from '../../../style/components/status';
import { OverlayLoad } from '../../../style/components/overlay';
import Loader from '../../Shared/Loader';

import {
  apiUserVerify,
  userSetStatus,
  userResetAuthStatus,
} from '../../../store/user';

const AuthVerification = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { registrationOK, actionStatusOK, actionStatusMessage } = useSelector(
    (state) => state.user
  );
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitForm = (e) => {
    e.preventDefault();
    e.target.reset();
    dispatch(userSetStatus(true, ''));
    dispatch(
      apiUserVerify(
        email,
        userName,
        code,
        password,
        passwordRepeat,
        firstName,
        lastName
      )
    );
    setLoading(true);
  };

  const onFormChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'code':
        setCode(e.target.value);
        break;
      case 'username':
        setUserName(e.target.value);
        break;
      case 'firstname':
        setFirstName(e.target.value);
        break;
      case 'lastname':
        setLastName(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'password-repeat':
        setPasswordRepeat(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (registrationOK) {
      push('/sign-up-verification-success');
      dispatch(userResetAuthStatus());
    }
  }, [registrationOK, push, dispatch]);

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
          <CenteredH1>Verification</CenteredH1>
          <AuthFormGridDouble>
            <FormField span={2}>
              <FormLabel>
                <FormLabelText>Code</FormLabelText>
                <Input name="code" type="text" onChange={onFormChange} />
              </FormLabel>
            </FormField>
            <FormField>
              <FormLabel>
                <FormLabelText>E-Mail</FormLabelText>
                <Input name="email" type="email" onChange={onFormChange} />
              </FormLabel>
            </FormField>
            <FormField>
              <FormLabel>
                <FormLabelText>Username</FormLabelText>
                <Input name="username" type="text" onChange={onFormChange} />
              </FormLabel>
            </FormField>
            <FormField>
              <FormLabel>
                <FormLabelText>First Name</FormLabelText>
                <Input name="firstname" type="text" onChange={onFormChange} />
              </FormLabel>
            </FormField>
            <FormField>
              <FormLabel>
                <FormLabelText>Last Name</FormLabelText>
                <Input name="lastname" type="text" onChange={onFormChange} />
              </FormLabel>
            </FormField>
            <FormField>
              <FormLabel>
                <FormLabelText>Password</FormLabelText>
                <Input
                  name="password"
                  type="password"
                  onChange={onFormChange}
                />
              </FormLabel>
            </FormField>
            <FormField>
              <FormLabel>
                <FormLabelText>Repeat Password</FormLabelText>
                <Input
                  name="password-repeat"
                  type="password"
                  onChange={onFormChange}
                />
              </FormLabel>
            </FormField>
            {!actionStatusOK ? (
              <StatusMessage>{actionStatusMessage}</StatusMessage>
            ) : (
              <></>
            )}
          </AuthFormGridDouble>
        </AuthFormContent>
        <AuthFormFooter>
          <ButtonPrimaryLarge type="submit">Complete</ButtonPrimaryLarge>
          <AuthFormProgressWrapper>
            <ProgressDot />
            <ProgressDot />
            <ProgressDot isActive />
          </AuthFormProgressWrapper>
        </AuthFormFooter>
      </AuthFormContainer>
    </>
  );
};

export default AuthVerification;
