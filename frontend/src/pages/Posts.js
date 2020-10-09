import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DefaultPage from '../components/Shared/DefaultPage';
import PostsFilterBar from '../components/Posts/PostsFilterBar';
import PostsGrid from '../components/Posts/PostsGrid';
import { WidthController } from '../style/layout/pages';

const Posts = () => {
  const posts = useSelector((state) => state.posts.data);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <DefaultPage>
      <PostsFilterBar fnSearch={setSearchTerm} />
      <WidthController>
        <PostsGrid posts={posts} editable searchTerm={searchTerm} />
      </WidthController>
    </DefaultPage>
  );
};

export default Posts;
