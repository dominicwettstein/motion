import React from 'react';

import AuthPage from '../components/Authentication/AuthPage';
import AuthSignUpSuccess from '../components/Authentication/AuthSignUpSuccess';

const SignUpSuccess = () => {
  return (
    <AuthPage>
      <AuthSignUpSuccess></AuthSignUpSuccess>
    </AuthPage>
  );
};

export default SignUpSuccess;
