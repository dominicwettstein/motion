import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  height: ${(props) => props.theme.barHeight};
  width: 100vw;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid ${(props) => props.theme.colorGreySuperLight};
  padding: 0 ${(props) => props.theme.spaceL};
  padding-top: 2x;
  position: sticky;
  top: ${(props) => props.theme.barHeight};
  background-color: ${(props) => props.theme.colorBG};
  z-index: 1;
`;

export const SearchBarWidthController = styled.div`
  height: 100%;
  width: ${(props) => props.theme.controlledWidth};
  display: grid;
  grid-template-columns: 1fr auto;
`;

export const SearchContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: ${(props) => props.theme.spaceXXXL};
`;

export const SearchIcon = styled.p`
  height: 20px;
  width: 20px;
  font-size: 26px;
  margin-bottom: 2px;
  margin-right: ${(props) => props.theme.spaceM};
  font-family: 'Material Icons';
`;

export const SearchFilterContainer = styled.ul`
  height: 100%;
  display: flex;
`;

export const SearchFilterItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  margin-left: ${(props) => props.theme.spaceL};
  margin-bottom: -2px;
  padding: 2px 2px 0 2px;
  border-bottom: 2px solid
    ${(props) => (props.isActive ? props.theme.colorDark : 'transparent')};
  opacity: ${(props) => (props.isActive ? '1' : '0.5')};
  cursor: pointer;

  :hover {
    opacity: 1;
    border-bottom-color: ${(props) => props.theme.colorGrey};
  }
`;
