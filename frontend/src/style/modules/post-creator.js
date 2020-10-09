import styled from 'styled-components';

export const PostCreatorContent = styled.div`
  display: flex;
  align-items: center;
`;

export const PostCreatorForm = styled.form`
  margin-left: ${(props) => props.theme.spaceM};
  display: flex;
  align-items: center;
  flex-grow: 1;
`;
