import styled from 'styled-components';

export const Flyout = styled.div`
  background-color: ${(props) => props.theme.colorLight};
  box-shadow: ${(props) => props.theme.shadowTile};
  position: absolute;
  top: 97%;
  right: 0;
  display: none;
  z-index: 99;
`;
