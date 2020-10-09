import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';

import { PostGallery, PostGalleryImage } from '../../../style/modules/post';

const PostTileGallery = (props) => {
  const [toggler, setToggler] = useState(false);

  return (
    <PostGallery columns={props.images.length > 1 ? 2 : 1}>
      {props.images.map((image) => (
        <PostGalleryImage
          src={image.image}
          key={image.image}
          onClick={() => setToggler(!toggler)}
        ></PostGalleryImage>
      ))}
      <FsLightbox
        toggler={toggler}
        sources={props.images.map((image) => image.image)}
        type="image"
      />
    </PostGallery>
  );
};

export default PostTileGallery;
