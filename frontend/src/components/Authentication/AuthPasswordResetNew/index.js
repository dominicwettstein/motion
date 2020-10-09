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
import {
  apiUserPwResetVerify,
  userSetStatus,
  userResetAuthStatus,
} from '../../../store/user';
import { OverlayLoad } from '../../../style/components/overlay';
import Loader from '../../Shared/Loader';

const AuthPasswordResetNew = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { pwResetOK, actionStatusOK, actionStatusMessage } = useSelector(
    (state) => state.user
  );
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitForm = (e) => {
    e.preventDefault();
    e.target.reset();
    dispatch(userSetStatus(true, ''));
    dispatch(apiUserPwResetVerify(email, code, password, passwordRepeat));
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
    if (pwResetOK) {
      push('/password-reset-success');
      dispatch(userResetAuthStatus());
    }
  }, [pwResetOK, push, dispatch]);

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
        <> Remember password ?</>
        <Link to="/login" onClick={() => dispatch(userSetStatus(true, ''))}>
          <ButtonOutline hasMarginLeft> Sign in </ButtonOutline>
        </Link>
      </FloatingButtonContainer>
      <AuthFormContainer onSubmit={onSubmitForm}>
        <AuthFormContent>
          <CenteredH1> New password </CenteredH1>
          <AuthFormGridDouble>
            <FormField>
              <FormLabel>
                <FormLabelText>Code</FormLabelText>
                <Input name="code" type="text" onChange={onFormChange} />
              </FormLabel>
            </FormField>
            <FormField>
              <FormLabel>
                <FormLabelText>E - Mail</FormLabelText>
                <Input name="email" type="email" onChange={onFormChange} />
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
          </AuthFormGridDouble>
          {!actionStatusOK ? (
            <StatusMessage>{actionStatusMessage}</StatusMessage>
          ) : (
            <> </>
          )}
        </AuthFormContent>
        <AuthFormFooter>
          <ButtonPrimaryLarge type="submit">Reset</ButtonPrimaryLarge>
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

export default AuthPasswordResetNew;
