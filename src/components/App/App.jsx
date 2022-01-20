import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import Searchbar from '../Searchbar/';
import ImageGallery from '../ImageGallery';
import Button from '../Button/';
import { Container } from './App.styled';
import { getImages } from '../../services/searchImagesApi';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
  };

  componentDidUpdate(prevProps, prevStates) {
    const { page, query } = this.state;

    if (prevStates.query !== query) {
      this.setState({ loading: true });

      getImages(query, page)
        .then(({ data }) => this.setState({ images: data.hits }))
        .catch(error => console.log(error.message))
        .finally(() => this.setState({ loading: false }));
    } else if (prevStates.page !== page) {
      this.setState({ loading: true });

      getImages(query, page)
        .then(({ data }) =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          })),
        )
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
    const { images } = this.state;

    return (
      <Container>
        <Toaster />
        <Searchbar onSubmit={handleFormSubmit} />

        {images.length > 0 && (
          <>
            <ImageGallery images={images} />
            <Button onClick={handleLoadMoreBtn} />
          </>
        )}
      </Container>
    );
  }
}

export default App;
