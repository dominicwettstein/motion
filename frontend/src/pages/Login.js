import React from 'react';

import AuthPage from '../components/Authentication/AuthPage';
import AuthLogin from '../components/Authentication/AuthLogin';

const Login = () => {
  return (
    <AuthPage>
      <AuthLogin></AuthLogin>
    </AuthPage>
  );
};

export default Login;
