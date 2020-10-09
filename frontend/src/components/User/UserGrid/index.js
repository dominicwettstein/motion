import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { apiUsersGetAll } from '../../../store/users';
import { UserGridContainer } from '../../../style/layout/grids';
import UserTile from '../UserTile';
import { EmptyDBContainer } from '../../../style/components/status';
import Loader from '../../Shared/Loader';

const UserGrid = (props) => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user);
  const users = props.users;

  useEffect(() => {
    dispatch(apiUsersGetAll(me.token));
  }, [me.token, dispatch]);

  return (
    <>
      {users !== null && users.length > 0 ? (
        <UserGridContainer>
          {users.map((user) => {
            return <UserTile key={user.id} userDetails={user}></UserTile>;
          })}
        </UserGridContainer>
      ) : (
        <EmptyDBContainer>
          {users === null ? 'No users in this category' : <Loader />}
        </EmptyDBContainer>
      )}
    </>
  );
};

export default UserGrid;
