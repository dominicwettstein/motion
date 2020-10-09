import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactTinyLink } from 'react-tiny-link';

export const SmallLink = styled(Link)`
  text-decoration: none;
  font-size: ${(props) => props.theme.textSizeS};
  color: ${(props) => props.theme.colorMain};

  :hover {
    text-decoration: underline;
  }
`;

export const LinkPreview = styled(ReactTinyLink)``;
