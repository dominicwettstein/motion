import styled from 'styled-components';

export const PostEditorSharedIntro = styled.div`
  padding: ${(props) => props.theme.spaceL};
  padding-bottom: 0;
  text-align: left;
  color: ${(props) => props.theme.colorGrey};
`;

export const PostEditorSharedIntroName = styled.span`
  font-weight: 700;
`;

export const PostEditorMain = styled.div`
  padding: ${(props) => props.theme.spaceL};
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: ${(props) => props.theme.spaceL};
`;

export const PostEditorContent = styled.div`
  padding-top: ${(props) => props.theme.spaceXS};
`;

export const PostEditorImageContainer = styled.div`
  margin-top: ${(props) => props.theme.spaceM};
  display: flex;
  flex-wrap: wrap;
`;

export const PostEditorThumbnail = styled.div`
  height: 80px;
  width: 80px;
  background-image: ${(props) => `url(${props.background})`};
  background-position: center;
  background-size: cover;
  margin-right: ${(props) => props.theme.spaceS};
  margin-bottom: ${(props) => props.theme.spaceS};
  border-radius: ${(props) => props.theme.radiusDefault};
  position: relative;
`;

export const PostEditorThumbnailButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
  color: ${(props) => props.theme.colorLight};
  outline: none;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  font-family: 'Material Icons';
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 22px;

  :hover {
    opacity: 1;
  }
`;

export const PostEditorFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: ${(props) => props.theme.spaceL};
  align-items: center;
  border-top: 2px solid ${(props) => props.theme.colorGreySuperLight};
`;

export const PostEditorButtonWrapper = styled.div`
  display: flex;
`;

export const PostEditorURLWrapper = styled.div`
  margin-top: ${(props) => props.theme.spaceM};
`;
