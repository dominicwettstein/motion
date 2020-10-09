import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AlertContainer,
  AlertSubtitle,
  AlertBlock,
  AlertItem,
  AlertItemDetails,
  AlertItemName,
  AlertItemLocation,
  AlertItemButtonContainer,
} from '../../../../style/modules/alert-flyout';
import { Avatar } from '../../../../style/components/avatar';
import {
  ButtonIconGrey,
  ButtonIconPrimary,
} from '../../../../style/components/button';
import {
  apiUserConfirmRequest,
  apiUserDeleteRequest,
} from '../../../../store/user';

const AlertFlyout = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user);
  const myRequests = me.requests.filter(
    (request) =>
      request.requester.id === me.userData.id && request.status === 'P'
  );
  const otherRequests = me.requests.filter(
    (request) =>
      request.receiver.id === me.userData.id && request.status === 'P'
  );

  const deleteRequest = (requestID) => {
    dispatch(apiUserDeleteRequest(me.token, requestID));
  };

  const acceptRequest = (requestID) => {
    dispatch(apiUserConfirmRequest(me.token, requestID));
  };

  return (
    <AlertContainer>
      {otherRequests.length === 0 && myRequests.length === 0 ? (
        <p>No pending friend requests</p>
      ) : (
        <></>
      )}
      {otherRequests.length > 0 ? (
        <>
          <AlertSubtitle>Received requests</AlertSubtitle>
          <AlertBlock>
            {otherRequests.map((request) => (
              <AlertItem key={request.id}>
                <Avatar src={request.requester.avatar}></Avatar>
                <AlertItemDetails>
                  <AlertItemName>
                    {request.requester.first_name} {request.requester.last_name}
                  </AlertItemName>
                  <AlertItemLocation>
                    {request.requester.location}
                  </AlertItemLocation>
                </AlertItemDetails>
                <AlertItemButtonContainer>
                  <ButtonIconPrimary
                    title="Accept"
                    onClick={() => acceptRequest(request.id)}
                  >
                    
                  </ButtonIconPrimary>
                  <ButtonIconGrey
                    title="Reject"
                    onClick={() => deleteRequest(request.id)}
                    marginLeft="8px"
                  >
                    
                  </ButtonIconGrey>
                </AlertItemButtonContainer>
              </AlertItem>
            ))}
          </AlertBlock>
        </>
      ) : (
        <></>
      )}
      {myRequests.length > 0 ? (
        <>
          <AlertSubtitle>Sent requests</AlertSubtitle>
          <AlertBlock>
            {myRequests.map((request) => (
              <AlertItem key={request.id}>
                <Avatar src={request.receiver.avatar}></Avatar>
                <AlertItemDetails>
                  <AlertItemName>
                    {request.receiver.first_name} {request.receiver.last_name}
                  </AlertItemName>
                  <AlertItemLocation>
                    {request.receiver.location}
                  </AlertItemLocation>
                </AlertItemDetails>
                <AlertItemButtonContainer>
                  <ButtonIconGrey
                    title="Take back request"
                    onClick={() => deleteRequest(request.id)}
                  >
                    
                  </ButtonIconGrey>
                </AlertItemButtonContainer>
              </AlertItem>
            ))}
          </AlertBlock>
        </>
      ) : (
        <></>
      )}
    </AlertContainer>
  );
};

export default AlertFlyout;
