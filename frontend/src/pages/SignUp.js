import React from 'react';

import AuthPage from '../components/Authentication/AuthPage';
import AuthSignUp from '../components/Authentication/AuthSignUp';

const SignUp = () => {
  return (
    <AuthPage>
      <AuthSignUp></AuthSignUp>
    </AuthPage>
  );
};

export default SignUp;
