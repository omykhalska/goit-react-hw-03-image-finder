import React from 'react';
import { GalleryBox } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';

function ImageGallery({ images }) {
  return (
    <>
      <GalleryBox>
        {images.map(({ webformatURL, tags }, index) => (
          <ImageGalleryItem
            key={index}
            imageUrl={webformatURL}
            imageTags={tags}
          />
        ))}
      </GalleryBox>
    </>
  );
}

export default ImageGallery;
