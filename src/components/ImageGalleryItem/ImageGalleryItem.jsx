import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

function ImageGalleryItem({ imageUrl, imageTags, onClick }) {
  return (
    <GalleryItem onClick={onClick}>
      <GalleryImage src={imageUrl} alt={imageTags} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  imageTags: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
