import React from 'react';

import AuthPage from '../components/Authentication/AuthPage';
import AuthVerificationSuccess from '../components/Authentication/AuthVerificationSuccess';

const SignUpVerificationSuccess = () => {
  return (
    <AuthPage>
      <AuthVerificationSuccess></AuthVerificationSuccess>
    </AuthPage>
  );
};

export default SignUpVerificationSuccess;
