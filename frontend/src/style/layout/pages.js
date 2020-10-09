import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
`;

export const PageContainerDefault = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${(props) => props.theme.barHeight};
  padding-bottom: ${(props) => props.theme.spaceXXL};
  background-color: ${(props) => props.theme.colorBG};
`;

export const PageContainerAuth = styled(PageContainer)`
  display: grid;
  grid-template-columns: 40% 60%;
  background-color: ${(props) => props.theme.colorBackgroundLight};
`;

export const WidthController = styled.div`
  width: 100%;
  min-width: 600px;
  max-width: ${(props) => props.theme.controlledWidth};
`;
