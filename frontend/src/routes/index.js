import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import protectedComponent from '../hoc/AuthHOC';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SignUpSuccess from '../pages/SignUpSuccess';
import SignUpVerification from '../pages/SignUpVerification';
import SignUpVerificationSuccess from '../pages/SignUpVerificationSuccess';
import Posts from '../pages/Posts';
import Users from '../pages/Users';
import UserProfile from '../pages/UserProfile';
import UserProfileEdit from '../pages/UserProfileEdit';
import PasswordReset from '../pages/PasswordReset';
import PasswordResetSent from '../pages/PasswordResetSent';
import PasswordResetNew from '../pages/PasswordResetNew';
import PasswordResetSuccess from '../pages/PasswordResetSuccess';

const MainRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-up-success" component={SignUpSuccess} />
        <Route
          exact
          path="/sign-up-verification"
          component={SignUpVerification}
        />
        <Route
          exact
          path="/sign-up-verification-success"
          component={SignUpVerificationSuccess}
        />
        <Route exact path="/password-reset" component={PasswordReset} />
        <Route
          exact
          path="/password-reset-sent"
          component={PasswordResetSent}
        />
        <Route exact path="/password-reset-new" component={PasswordResetNew} />
        <Route
          exact
          path="/password-reset-success"
          component={PasswordResetSuccess}
        />
        <Route exact path="/posts" component={protectedComponent(Posts)} />
        <Route exact path="/users" component={protectedComponent(Users)} />
        <Route
          exact
          path="/profile/:id"
          component={protectedComponent(UserProfile)}
        />
        <Route
          exact
          path="/profile-edit"
          component={protectedComponent(UserProfileEdit)}
        />
      </Switch>
    </Router>
  );
};

export default MainRoutes;
