import styled from 'styled-components';
import Masonry from 'react-masonry-css';

const DefaultGrid = styled.div`
  display: grid;
  grid-column-gap: ${(props) => props.theme.spaceL};
  max-width: 100%;
`;

export const UserGridContainer = styled(DefaultGrid)`
  grid-template-columns: 1fr 1fr 1fr;
`;

export const PostsGridContainer = styled(Masonry)`
  margin-left: -${(props) => props.theme.spaceL};
  display: flex;
`;
