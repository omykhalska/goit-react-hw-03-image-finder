import React from 'react';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

function ImageGalleryItem({ imageUrl, imageTags, onClick }) {
  return (
    <GalleryItem onClick={onClick}>
      <GalleryImage src={imageUrl} alt={imageTags} />
    </GalleryItem>
  );
}

export default ImageGalleryItem;
