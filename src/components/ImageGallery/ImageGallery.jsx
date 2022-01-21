import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryBox } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';

class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func,
  };

  state = { activeImage: 0 };

  setActiveImage = index => {
    this.setState({ activeImage: index });
  };

  render() {
    const { images, onClick } = this.props;
    const { setActiveImage } = this;
    return (
      <GalleryBox>
        {images.map(({ webformatURL, tags }, index) => (
          <ImageGalleryItem
            key={index}
            imageUrl={webformatURL}
            imageTags={tags}
            onClick={() => {
              setActiveImage(index);
              onClick(index);
            }}
          />
        ))}
      </GalleryBox>
    );
  }
}

export default ImageGallery;
