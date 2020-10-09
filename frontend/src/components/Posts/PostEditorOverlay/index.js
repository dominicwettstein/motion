import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AvatarLarge } from '../../../style/components/avatar';
import { InputArea, HiddenInput, Input } from '../../../style/components/input';
import {
  ButtonIconPrimaryLarge,
  FakeButtonIcon,
  ButtonIcon,
  ButtonIconGreySmall,
} from '../../../style/components/button';
import { apiPostCreate, apiPostUpdate } from '../../../store/posts';
import {
  PostEditorContent,
  PostEditorMain,
  PostEditorFooter,
  PostEditorThumbnail,
  PostEditorImageContainer,
  PostEditorThumbnailButton,
  PostEditorSharedIntro,
  PostEditorSharedIntroName,
  PostEditorButtonWrapper,
  PostEditorURLWrapper,
} from '../../../style/modules/post-editor';
import {
  OverlayBackground,
  OverlayContainer,
  OverlayCloseButton,
  OverlayContent,
} from '../../../style/components/overlay';
import { FormField } from '../../../style/components/form';

const PostEditorOverlay = (props) => {
  const [message, setMessage] = useState(props.oldPostData.content || '');
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState(props.oldPostData.url || '');
  const dispatch = useDispatch();
  const { token, userData } = useSelector((state) => state.user);
  const isSharing = Object.keys(props.sharedPostData).length > 0;
  const isEditing = Object.keys(props.oldPostData).length > 0;

  const onSubmitForm = (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append('content', message);
    postData.append('url', url);
    images.forEach((image) => {
      postData.append('images', image);
    });
    if (isSharing) {
      postData.append('shared_post', props.sharedPostData.id);
    }

    if (isEditing) {
      dispatch(apiPostUpdate(token, props.oldPostData.id, postData));
    } else {
      dispatch(apiPostCreate(token, postData));
    }
    props.closeFn();
  };

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const onUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const onImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImages([...images, ...e.target.files]);
    }
  };

  const removeImage = (deleteImage) => {
    let newImages = images.filter((image) => image !== deleteImage);
    setImages(newImages);
  };

  return (
    <OverlayBackground>
      <OverlayContainer>
        <OverlayCloseButton onClick={props.closeFn}></OverlayCloseButton>
        <OverlayContent width="600px" noPadding>
          {isSharing ? (
            <PostEditorSharedIntro>
              Share{' '}
              <PostEditorSharedIntroName>
                {props.sharedPostData.user.first_name}{' '}
                {props.sharedPostData.user.last_name}
              </PostEditorSharedIntroName>
              's post:
            </PostEditorSharedIntro>
          ) : (
            <></>
          )}
          <PostEditorMain>
            <AvatarLarge src={userData.avatar}></AvatarLarge>
            <PostEditorContent>
              <InputArea
                rows="4"
                placeholder={`${
                  isSharing
                    ? 'What would you like to share,'
                    : "What's on your mind,"
                } ${userData.first_name}?`}
                defaultValue={
                  props.oldPostData ? props.oldPostData.content : ''
                }
                onChange={onMessageChange}
                autoFocus
              ></InputArea>
              {images.length > 0 ? (
                <PostEditorImageContainer>
                  {images.map((image) => (
                    <PostEditorThumbnail
                      key={image.name}
                      background={URL.createObjectURL(image)}
                    >
                      <PostEditorThumbnailButton
                        onClick={() => removeImage(image)}
                      >
                        
                      </PostEditorThumbnailButton>
                    </PostEditorThumbnail>
                  ))}
                </PostEditorImageContainer>
              ) : (
                <></>
              )}
              {url !== '' ? (
                <PostEditorURLWrapper>
                  <FormField>
                    <Input
                      type="text"
                      onChange={onUrlChange}
                      defaultValue={url}
                    />
                    <ButtonIconGreySmall
                      onClick={() => setUrl('')}
                      title="Remove URL"
                    >
                      
                    </ButtonIconGreySmall>
                  </FormField>
                </PostEditorURLWrapper>
              ) : (
                <></>
              )}
            </PostEditorContent>
          </PostEditorMain>
          <PostEditorFooter>
            <PostEditorButtonWrapper>
              <label>
                <FakeButtonIcon title="Add images"></FakeButtonIcon>
                <HiddenInput
                  type="file"
                  multiple
                  onChange={onImageChange}
                ></HiddenInput>
              </label>
              {url === '' ? (
                <ButtonIcon
                  title="Add a link"
                  onClick={() => setUrl('https://')}
                >
                  
                </ButtonIcon>
              ) : (
                <></>
              )}
            </PostEditorButtonWrapper>
            <ButtonIconPrimaryLarge
              title="Save"
              type="submit"
              onClick={onSubmitForm}
            >
              
            </ButtonIconPrimaryLarge>
          </PostEditorFooter>
        </OverlayContent>
      </OverlayContainer>
    </OverlayBackground>
  );
};

export default PostEditorOverlay;
