import styled from 'styled-components';

export const PostCommentorForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-gap: ${(props) => props.theme.spaceS};
  align-items: center;
`;
