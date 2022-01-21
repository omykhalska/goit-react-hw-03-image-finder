import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from '../Searchbar/';
import ImageGallery from '../ImageGallery';
import Button from '../Button/';
import { Container } from './App.styled';
import { getImages } from '../../services/searchImagesApi';

class App extends Component {
  state = {
    query: '',
    images: [],
    totalImages: 0,
    page: 1,
    loading: false,
  };

  componentDidUpdate(_, prevStates) {
    const { page, query } = this.state;

    if (prevStates.query !== query) {
      this.setState({ loading: true });

      getImages(query, page)
        .then(({ data }) => {
          this.setState({ images: data.hits, totalImages: data.totalHits });
          // TODO: убрать этот блок, если его нет в ТЗ (ПРОВЕРИТЬ !!!)
          //   data.hits.length === 0 &&
          //   toast.error('There is no images for this search query');
        })
        .catch(error => console.log(error.message))
        .finally(() => this.setState({ loading: false }));
    } else if (prevStates.page !== page) {
      this.setState({ loading: true });

      getImages(query, page)
        .then(({ data }) => {
          if (data.hits.length === 0) {
            toast.error('No more images found', { position: 'bottom-center' });
            return;
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }));
        })
        .catch(error => console.log(error.message))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleLoadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = query => {
    this.setState({ query, page: 1 });
  };

  render() {
    const { handleFormSubmit, handleLoadMoreBtn } = this;
    const { images, totalImages } = this.state;

    return (
      <Container>
        <Toaster />
        <Searchbar onSubmit={handleFormSubmit} />

        {images.length > 0 ? <ImageGallery images={images} /> : null}

        {images.length > 0 && totalImages !== images.length ? (
          <Button onClick={handleLoadMoreBtn} />
        ) : null}
      </Container>
    );
  }
}

export default App;
