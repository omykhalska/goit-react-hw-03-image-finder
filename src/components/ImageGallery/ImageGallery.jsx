import React, { Component } from 'react';
import { GalleryBox } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';

class ImageGallery extends Component {
  state = { activeImage: 0 };

  setActiveImage = index => {
    this.setState({ activeImage: index });
  };

  render() {
    const { images } = this.props;
    return (
      <GalleryBox>
        {images.map(({ webformatURL, tags }, index) => (
          <ImageGalleryItem
            key={index}
            imageUrl={webformatURL}
            imageTags={tags}
            onClick={() => {
              this.setActiveImage(index);
              this.props.onClick(index);
            }}
          />
        ))}
      </GalleryBox>
    );
  }
}

export default ImageGallery;
