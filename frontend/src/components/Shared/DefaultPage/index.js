import React from 'react';

import { PageContainerDefault } from '../../../style/layout/pages';
import Header from '../Header';

const DefaultPage = (props) => {
  return (
    <PageContainerDefault>
      <Header></Header>
      {props.children}
    </PageContainerDefault>
  );
};

export default DefaultPage;
