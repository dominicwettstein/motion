import styled from 'styled-components';

export const OverlayBackground = styled.div`
  z-index: 100;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OverlayContainer = styled.div`
  position: relative;
`;

export const OverlayContent = styled.div`
  box-shadow: ${(props) => props.theme.shadowTile};
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${(props) => props.theme.colorLight};
  border-radius: ${(props) => props.theme.radiusDefault};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  padding: ${(props) => (props.noPadding ? '0' : props.theme.spaceXL)};
  text-align: center;
`;

export const OverlayCloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: ${(props) => props.theme.controlHeight};
  width: ${(props) => props.theme.controlHeight};
  border-radius: ${(props) => props.theme.controlHeight};
  margin-right: -40px;
  margin-top: -40px;
  outline: none;
  border: none;
  cursor: pointer;
  font-family: 'Material Icons';
  font-size: 22px;
  color: white;
  background-color: transparent;

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const OverlayText = styled.p`
  font-size: ${(props) => props.theme.textSizeL};
`;

export const OverlayButtonRow = styled.div`
  padding-top: ${(props) => props.theme.spaceL};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${(props) => props.theme.spaceL};
`;

export const OverlayLoad = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;
