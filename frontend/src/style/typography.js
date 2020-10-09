import styled from 'styled-components';

export const H1 = styled.h1`
  font-weight: ${(props) => props.theme.textWeightRegular};
  font-size: ${(props) => props.theme.textSizeXL};
  margin-bottom: ${(props) => props.theme.spaceL};
`;

export const CenteredH1 = styled(H1)`
  text-align: center;
`;

export const H2 = styled.h2`
  font-weight: ${(props) => props.theme.textWeightRegular};
  font-size: ${(props) => props.theme.textSizeL};
  margin-bottom: ${(props) => props.theme.spaceM};
`;
