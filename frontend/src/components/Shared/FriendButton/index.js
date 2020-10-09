import React from 'react';
import { useDispatch } from 'react-redux';
import { ButtonPrimary, ButtonOutline } from '../../../style/components/button';
import {
  apiUserConfirmRequest,
  apiUserSendRequest,
  apiUserDeleteRequest,
} from '../../../store/user';

const FriendButton = (props) => {
  const dispatch = useDispatch();
  const ownRequests = props.requests;
  const ownID = props.ownID;
  const otherID = props.otherID;
  const token = props.token;

  const acceptedRequest = ownRequests.filter(
    (request) =>
      request.status === 'A' &&
      (request.requester.id === otherID || request.receiver.id === otherID)
  );

  const otherRequested = ownRequests.filter(
    (request) => request.requester.id === otherID
  );

  const meRequested = ownRequests.filter(
    (request) => request.receiver.id === otherID
  );

  if (acceptedRequest.length > 0) {
    return (
      <ButtonPrimary
        onClick={() =>
          dispatch(apiUserDeleteRequest(token, acceptedRequest[0].id))
        }
      >
        Unfriend
      </ButtonPrimary>
    );
  } else if (otherRequested.length > 0) {
    return (
      <ButtonOutline
        onClick={() =>
          dispatch(apiUserConfirmRequest(token, otherRequested[0]))
        }
      >
        Accept Friend
      </ButtonOutline>
    );
  } else if (meRequested.length > 0) {
    return (
      <ButtonOutline
        onClick={() => dispatch(apiUserDeleteRequest(token, meRequested[0].id))}
      >
        Unrequest
      </ButtonOutline>
    );
  } else {
    return (
      <ButtonOutline
        onClick={() => dispatch(apiUserSendRequest(token, ownID, otherID))}
      >
        Add Friend
      </ButtonOutline>
    );
  }
};

export default FriendButton;
