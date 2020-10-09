import React from 'react';
import { useDispatch } from 'react-redux';

import { ButtonPrimary, ButtonOutline } from '../../../style/components/button';
import { apiUserFollow } from '../../../store/user';

const FollowButton = (props) => {
  const dispatch = useDispatch();
  const following = props.following
    ? props.following.map((item) => item.id)
    : [];

  if (following.includes(props.otherID)) {
    return (
      <ButtonPrimary
        onClick={() =>
          dispatch(apiUserFollow(props.token, props.ownUserName, props.otherID))
        }
      >
        Unfollow
      </ButtonPrimary>
    );
  } else {
    return (
      <ButtonOutline
        onClick={() =>
          dispatch(apiUserFollow(props.token, props.ownUserName, props.otherID))
        }
      >
        Follow
      </ButtonOutline>
    );
  }
};

export default FollowButton;
