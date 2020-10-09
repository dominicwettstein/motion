import React from 'react';
import BarLoader from 'react-spinners/BarLoader';

const Loader = (props) => {
  return (
    <div style={{ display: 'grid', gridGap: '40px' }}>
      <BarLoader
        height={'6px'}
        width={'200px'}
        color={'#c468ff'}
        loading={true}
      />
    </div>
  );
};

export default Loader;
