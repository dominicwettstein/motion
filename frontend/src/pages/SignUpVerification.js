import React from 'react';

import AuthPage from '../components/Authentication/AuthPage';
import AuthVerification from '../components/Authentication/AuthVerification';

const SignUpVerification = () => {
  return (
    <AuthPage>
      <AuthVerification></AuthVerification>
    </AuthPage>
  );
};

export default SignUpVerification;
