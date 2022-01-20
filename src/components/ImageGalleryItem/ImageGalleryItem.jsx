import React from 'react';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

function ImageGalleryItem({ imageUrl, imageTags }) {
  return (
    <GalleryItem>
      <GalleryImage src={imageUrl} alt={imageTags} />
    </GalleryItem>
  );
}

export default ImageGalleryItem;
