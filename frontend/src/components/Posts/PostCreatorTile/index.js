import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Avatar } from '../../../style/components/avatar';
import { Tile } from '../../../style/components/tile';
import { InputFullHeight } from '../../../style/components/input';
import { ButtonIconPrimary } from '../../../style/components/button';
import {
  PostCreatorContent,
  PostCreatorForm,
} from '../../../style/modules/post-creator';

const PostCreatorTile = (props) => {
  const { userData } = useSelector((state) => state.user);
  const { push } = useHistory();

  const onFormAction = (e) => {
    e.preventDefault();
    e.target.reset();
    props.fnOpenEditor();
  };

  const onInputChange = (e) => {
    e.preventDefault();
    e.target.value = '';
    props.fnOpenEditor();
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    props.fnOpenEditor();
  };

  return (
    <Tile span={2}>
      <PostCreatorContent>
        <Avatar
          src={userData.avatar}
          onClick={() => push(`/profile/${userData.id}`)}
          title={`View your profile`}
        ></Avatar>
        <PostCreatorForm onSubmit={onFormAction}>
          <InputFullHeight
            type="text"
            placeholder={`What's on your mind, ${userData.first_name}?`}
            onChange={onInputChange}
            autoFocus
          ></InputFullHeight>
          <ButtonIconPrimary onClick={onButtonClick}></ButtonIconPrimary>
        </PostCreatorForm>
      </PostCreatorContent>
    </Tile>
  );
};

export default PostCreatorTile;
