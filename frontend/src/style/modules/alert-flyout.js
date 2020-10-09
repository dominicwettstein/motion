import styled from 'styled-components';

export const AlertContainer = styled.div`
  padding: ${(props) => props.theme.spaceL};
  width: 360px;
  max-height: 480px;
  overflow: scroll;
  color: ${(props) => props.theme.colorDark};
`;

export const AlertSubtitle = styled.p`
  margin-bottom: ${(props) => props.theme.spaceM};
  font-weight: ${(props) => props.theme.textWeightMedium};
`;

export const AlertBlock = styled.ul`
  margin-bottom: ${(props) => props.theme.spaceL};

  :last-of-type {
    margin-bottom: 0;
  }
`;

export const AlertItem = styled.li`
  list-style: none;
  margin-bottom: ${(props) => props.theme.spaceM};
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: ${(props) => props.theme.spaceS};
  align-items: center;
`;

export const AlertItemDetails = styled.div``;

export const AlertItemName = styled.p``;

export const AlertItemLocation = styled.p`
  font-size: ${(props) => props.theme.textSizeS};
  opacity: 0.5;
`;

export const AlertItemButtonContainer = styled.div`
  display: flex;
`;
