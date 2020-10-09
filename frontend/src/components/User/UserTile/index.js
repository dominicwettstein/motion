import React from 'react';
import { v1 as uuidv1 } from 'uuid';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Tile } from '../../../style/components/tile';
import { AvatarLarge } from '../../../style/components/avatar';
import {
  UserName,
  UserLocationText,
  UserButtonRow,
  UserDescriptionText,
  UserInterestContainer,
  UserTileContent,
} from '../../../style/modules/user-tile';
import { Tag } from '../../../style/components/tag';
import FriendButton from '../../Shared/FriendButton';
import FollowButton from '../../Shared/FollowButton';
import { ButtonWrapper } from '../../../style/components/button';

const UserTile = (props) => {
  const me = useSelector((state) => state.user);
  const { push } = useHistory();

  return (
    <Tile>
      <UserTileContent>
        <AvatarLarge
          src={props.userDetails.avatar}
          onClick={() => push(`/profile/${props.userDetails.id}`)}
          title={`View ${props.userDetails.first_name}'s profile`}
        ></AvatarLarge>
        <UserName>
          {props.userDetails.first_name} {props.userDetails.last_name}
        </UserName>
        <UserLocationText>{props.userDetails.location}</UserLocationText>
        {props.userDetails.id !== me.userData.id ? (
          <UserButtonRow>
            <FollowButton
              following={me.following}
              ownUserName={me.userData.username}
              otherID={props.userDetails.id}
              token={me.token}
            ></FollowButton>
            <ButtonWrapper marginLeft="16px">
              <FriendButton
                requests={me.requests}
                ownID={me.userData.id}
                otherID={props.userDetails.id}
                token={me.token}
              ></FriendButton>
            </ButtonWrapper>
          </UserButtonRow>
        ) : (
          <></>
        )}
        <UserDescriptionText>{props.userDetails.about_me}</UserDescriptionText>
        <UserInterestContainer>
          {props.userDetails.things_user_likes.map((like) => (
            <Tag key={uuidv1()}>{like}</Tag>
          ))}
        </UserInterestContainer>
      </UserTileContent>
    </Tile>
  );
};

export default UserTile;
