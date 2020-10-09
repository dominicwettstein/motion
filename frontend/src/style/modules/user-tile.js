import styled from 'styled-components';
import { H2 } from '../typography';

export const UserTileContent = styled.div`
  text-align: center;
  padding: 8px;
`;

export const UserName = styled(H2)`
  margin-top: ${(props) => props.theme.spaceXS};
  margin-bottom: ${(props) => props.theme.spaceXS};
`;

export const UserLocationText = styled.p`
  margin-bottom: ${(props) => props.theme.spaceL};
  color: ${(props) => props.theme.colorGrey};
`;

export const UserButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spaceL};
`;

export const UserDescriptionText = styled.p``;

export const UserInterestContainer = styled.ul`
  margin-top: ${(props) => props.theme.spaceL};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
