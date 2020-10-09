import styled from 'styled-components';

export const StatusMessage = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colorWarning};
  padding: ${(props) => props.theme.spaceS} ${(props) => props.theme.spaceM};
  text-align: center;
  font-weight: ${(props) => props.theme.textWeightMedium};
`;

export const ProgressDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.isActive ? props.theme.colorMain : 'transparent'};
  border: 1px solid ${(props) => props.theme.colorMain};
  margin: 4px;
`;

export const MegaStatusIcon = styled.p`
  font-family: 'Material Icons';
  font-size: 48px;
  color: ${(props) => props.theme.colorMain};
  width: 80px;
  height: 80px;
  border-radius: 80px;
  border: 4px solid ${(props) => props.theme.colorMain};
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
`;

export const EmptyDBContainer = styled.div`
  grid-column: 1 / span 2;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
