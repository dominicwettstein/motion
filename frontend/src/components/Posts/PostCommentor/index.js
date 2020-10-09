import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PostCommentorForm } from '../../../style/modules/post-commentor';
import { AvatarSmall } from '../../../style/components/avatar';
import { InputArea } from '../../../style/components/input';
import {
  ButtonIconPrimarySmall,
  ButtonIconGreySmall,
} from '../../../style/components/button';
import { apiPostComment } from '../../../store/posts';

const PostCommentor = (props) => {
  const dispatch = useDispatch();
  const { userData, token } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');

  const onInputChange = (e) => {
    setComment(e.target.value);
  };

  const closeEditor = () => {
    setComment('');
    props.fnCloseEditor();
  };

  const onFormAction = (e) => {
    e.preventDefault();
    dispatch(apiPostComment(token, props.postID, comment));
    props.fnCloseEditor();
  };

  return (
    <PostCommentorForm onSubmit={onFormAction}>
      <AvatarSmall src={userData.avatar}></AvatarSmall>
      <InputArea
        type="text"
        placeholder={`Add a comment... (max. 100 char)`}
        onChange={onInputChange}
        maxLength="100"
        rows="1"
        autoFocus
      ></InputArea>
      <ButtonIconPrimarySmall title="Submit comment" onClick={onFormAction}>
        
      </ButtonIconPrimarySmall>
      <ButtonIconGreySmall title="Cancel" onClick={closeEditor}>
        
      </ButtonIconGreySmall>
    </PostCommentorForm>
  );
};

export default PostCommentor;
