import React from 'react';
import { useSelector } from 'react-redux';

import UserGrid from '../components/User/UserGrid';
import DefaultPage from '../components/Shared/DefaultPage';
import { WidthController } from '../style/layout/pages';

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <DefaultPage>
      <WidthController>
        <UserGrid users={users}></UserGrid>
      </WidthController>
    </DefaultPage>
  );
};

export default Users;
