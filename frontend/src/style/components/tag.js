import styled from 'styled-components';
import { ButtonIcon } from './button';

export const Tag = styled.li`
  height: ${(props) => props.theme.controlHeightSmall};
  border-radius: ${(props) => props.theme.controlHeightSmall};
  padding: ${(props) => props.theme.spaceS};
  background-color: ${(props) => props.theme.colorGreySuperLight};
  font-size: ${(props) => props.theme.textSizeS};
  list-style: none;
  margin-right: 6px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
`;

export const TagCloseButton = styled(ButtonIcon)`
  height: 100%;
  width: auto;
  padding-left: 4px;
  margin-left: ${(props) => props.theme.spaceXS};
  font-size: 16px;
`;
