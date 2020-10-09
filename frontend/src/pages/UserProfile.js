import React from 'react';

import DefaultPage from '../components/Shared/DefaultPage';
import ProfileRead from '../components/Profile/ProfileRead';

const UserProfile = () => {
  return (
    <DefaultPage>
      <ProfileRead></ProfileRead>
    </DefaultPage>
  );
};

export default UserProfile;
