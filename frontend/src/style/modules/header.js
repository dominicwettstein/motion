import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

export const HeaderContainer = styled.header`
  width: 100vw;
  height: ${(props) => props.theme.barHeight};
  position: fixed;
  top: 0;
  z-index: 2;
  background-color: ${(props) => props.theme.colorLight};
  box-shadow: ${(props) => props.theme.shadowTile};
  padding: 0 ${(props) => props.theme.spaceL};
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
`;

export const NavContainer = styled.nav`
  height: 100%;
  display: flex;
`;

export const NavItem = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.colorDark};
  display: flex;
  align-items: center;
  margin-right: ${(props) => props.theme.spaceXL};
  padding: 2px 2px 0 2px;
  border-bottom: 2px solid transparent;
  cursor: pointer;

  :hover {
    border-bottom-color: ${(props) => props.theme.colorGrey};
  }

  &.active {
    border-bottom-color: ${(props) => props.theme.colorMain};
  }
`;

export const NavItemIcon = styled.span`
  font-size: 20px;
  margin-right: ${(props) => props.theme.spaceS};
  font-family: 'Material Icons';
  color: ${(props) => props.theme.colorGrey};

  ${NavItem}:hover & {
    color: ${(props) => props.theme.colorGreyDark};
  }

  ${NavItem}.active & {
    opacity: 1;
    color: ${(props) => props.theme.colorMain};
  }
`;

export const SiteLogoLink = styled(Link)`
  margin-right: ${(props) => props.theme.spaceXXXL};
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colorDark};
  text-decoration: none;
  height: 100%;
`;

export const SiteLogo = styled.img`
  width: 26px;
  height: 26px;
  margin-right: ${(props) => props.theme.spaceS};
`;

export const SiteLogoText = styled.p`
  font-size: 22px;
`;

export const ProfileArea = styled.div`
  display: flex;
  align-items: center;
`;
