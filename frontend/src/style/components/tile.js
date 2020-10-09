import styled from 'styled-components';

export const Tile = styled.article`
  background-color: ${(props) => props.theme.colorLight};
  box-shadow: ${(props) => props.theme.shadowTile};
  padding: ${(props) => (props.noPadding ? 0 : props.theme.spaceL)};
  border-radius: ${(props) => props.theme.radiusDefault};
  width: 100%;
  word-break: break-word;
  text-align: left;
  grid-column: ${(props) => (props.span ? 'span ' + props.span : 'auto')};
  margin-top: ${(props) => props.theme.spaceL};
`;
