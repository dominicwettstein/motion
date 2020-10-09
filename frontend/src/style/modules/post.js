import styled from 'styled-components';

export const PostContainer = styled.div`
  height: 100%;
  display: grid;
  align-content: space-between;
  row-gap: ${(props) => props.theme.spaceM};
`;

export const PostContainerShared = styled.div`
  padding-top: 2px;
  padding-left: ${(props) => props.theme.spaceM};
  border-left: 1px solid ${(props) => props.theme.colorGreyLight};
  margin: ${(props) => props.theme.spaceS} 0;
`;

export const PostHeaderContainer = styled.header`
  display: grid;
  grid-template-columns: auto auto auto 1fr;
`;

export const PostMetaContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  padding-top: 2px;
  margin-left: ${(props) => props.theme.spaceS};
`;

export const PostMetaName = styled.p``;

export const PostMetaTimestamp = styled.p`
  font-size: ${(props) => props.theme.textSizeS};
  opacity: 0.5;
`;

export const PostSharedAddendum = styled.p`
  margin-left: ${(props) => props.theme.spaceXS};
  padding-top: 2px;
  opacity: 0.4;
`;

export const PostSettingsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const PostMainText = styled.p`
  line-height: 26px;
  white-space: pre-wrap;
`;

export const PostGallery = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)` || '1fr'};
  grid-gap: ${(props) => props.theme.spaceM};
`;

export const PostGalleryImage = styled.img`
  width: 100%;
  border-radius: ${(props) => props.theme.radiusDefault};
  cursor: zoom-in;
`;

export const PostFooter = styled.footer`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`;

export const PostFooterActions = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const PostFooterCounterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const PostFooterCounter = styled.p`
  text-align: right;
  color: ${(props) => props.theme.colorGrey};
  font-size: ${(props) => props.theme.textSizeS};
  padding-right: 2px;
  margin-left: ${(props) => props.theme.spaceS};
`;

export const PostCommentsWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.colorGreySuperLight};
  border-bottom: 1px solid ${(props) => props.theme.colorGreySuperLight};
  padding-bottom: ${(props) => props.theme.spaceM};
`;

export const PostComment = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.theme.spaceM};
  padding-left: 2px;
  min-height: ${(props) => props.theme.controlHeightSmall};
`;

export const PostCommentContent = styled.p`
  margin-left: ${(props) => props.theme.spaceS};
`;
