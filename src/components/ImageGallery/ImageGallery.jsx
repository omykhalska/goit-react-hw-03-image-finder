import React from 'react';
import { GalleryBox } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';

function ImageGallery({ images, onClick }) {
  return (
    <>
      <GalleryBox>
        {images.map(({ webformatURL, tags }, index) => (
          <ImageGalleryItem
            key={index}
            imageUrl={webformatURL}
            imageTags={tags}
            onClick={onClick}
          />
        ))}
      </GalleryBox>
    </>
  );
}

export default ImageGallery;
