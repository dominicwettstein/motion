import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';

import {
  SearchBarContainer,
  SearchBarWidthController,
  SearchContainer,
  SearchFilterContainer,
  SearchIcon,
  SearchFilterItem,
} from '../../../style/modules/filter-bar';
import { InputFullHeight } from '../../../style/components/input';
import { apiPostsGet, setFilter } from '../../../store/posts';

const PostsFilterBar = (props) => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user);
  const currentFilter = useSelector((state) => state.posts.filter);
  const loadingTrigger = useSelector((state) => state.posts.triggerReload);

  const filters = [
    { navValue: 'All', filterValue: 'ALL' },
    { navValue: 'Following', filterValue: 'FOLLOWING' },
    { navValue: 'Liked', filterValue: 'LIKED' },
    { navValue: 'Friends', filterValue: 'FRIENDS' },
    { navValue: 'Own', filterValue: 'OWN' },
  ];

  const updateFilter = (filter) => {
    dispatch(setFilter(filter));
  };

  const updateSearch = (e) => {
    e.preventDefault();
    props.fnSearch(e.target.value);
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (me.token !== '') {
      dispatch(apiPostsGet(me.token, currentFilter));
    }
  }, [me.token, currentFilter, loadingTrigger, dispatch]);

  return (
    <SearchBarContainer>
      <SearchBarWidthController>
        <SearchContainer>
          <SearchIcon></SearchIcon>
          <InputFullHeight
            type="search"
            placeholder="Search posts (user, content) ..."
            onChange={updateSearch}
          ></InputFullHeight>
        </SearchContainer>
        <SearchFilterContainer>
          {filters.map((item) => (
            <SearchFilterItem
              key={uuidv1()}
              isActive={currentFilter === item.filterValue}
              onClick={() => {
                scrollUp();
                updateFilter(item.filterValue);
              }}
            >
              {item.navValue}
            </SearchFilterItem>
          ))}
        </SearchFilterContainer>
      </SearchBarWidthController>
    </SearchBarContainer>
  );
};

export default PostsFilterBar;
