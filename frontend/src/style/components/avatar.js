import styled from 'styled-components';

export const Avatar = styled.img`
  width: ${(props) => props.theme.controlHeight};
  height: ${(props) => props.theme.controlHeight};
  border-radius: ${(props) => props.theme.controlHeight};
  border: none;
  background-color: ${(props) => props.theme.colorGreySuperLight};
  cursor: pointer;
`;

export const AvatarLarge = styled(Avatar)`
  width: ${(props) => props.theme.controlHeightLarge};
  height: ${(props) => props.theme.controlHeightLarge};
`;

export const AvatarSmall = styled(Avatar)`
  width: ${(props) => props.theme.controlHeightSmall};
  height: ${(props) => props.theme.controlHeightSmall};
`;
