import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner';
import Searchbar from '../Searchbar/';
import ImageGallery from '../ImageGallery';
import Button from '../Button/';
import { Container } from './App.styled';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { getImages } from '../../services/searchImagesApi';

class App extends Component {
  state = {
    query: '',
    images: [],
    totalImages: 0,
    page: 1,
    status: 'idle',
  };

  async componentDidUpdate(_, prevStates) {
    const { page, query } = this.state;
    const { notification } = this;

    if (prevStates.query !== query) {
      this.setState({ status: 'pending' });

      await getImages(query, page)
        .then(({ data }) => {
          if (data.hits.length === 0) {
            notification('There is no images for this search query');
            this.setState({ status: 'idle', images: [] });
            return;
          }

          this.setState({
            images: data.hits,
            totalImages: data.totalHits,
            status: 'resolved',
          });
        })
        .catch(error => {
          console.log(error.message);
          this.setState({ status: 'rejected' });
        });
    } else if (prevStates.page !== page) {
      this.setState({ status: 'pending' });

      await getImages(query, page)
        .then(({ data }) =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            status: 'resolved',
          })),
        )
        .catch(error => {
          console.log(error.message);
          this.setState({ status: 'rejected' });
        });
    }
  }

  handleLoadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = query => {
    this.setState({ query, page: 1 });
  };

  notification = text => {
    toast.error(text);
  };

  render() {
    const { handleFormSubmit, handleLoadMoreBtn } = this;
    const { images, totalImages, status, page } = this.state;

    if (status === 'idle') {
      return (
        <Container>
          <Toaster />
          <Searchbar onSubmit={handleFormSubmit} />
        </Container>
      );
    }

    if (status === 'pending') {
      if (page > 1) {
        return (
          <Container>
            <Toaster />
            <Searchbar onSubmit={handleFormSubmit} />
            <ImageGallery images={images} />
            <BallTriangle
              heigth="100"
              width="100"
              color="grey"
              arialLabel="loading-indicator"
            />
          </Container>
        );
      } else {
        return (
          <Container>
            <Toaster />
            <Searchbar onSubmit={handleFormSubmit} />
            <BallTriangle
              heigth="100"
              width="100"
              color="grey"
              arialLabel="loading-indicator"
            />
          </Container>
        );
      }
    }

    if (status === 'rejected') {
      return (
        <Container>
          <Toaster />
          <Searchbar onSubmit={handleFormSubmit} />
          <h1>Something went wrong... Try again later!</h1>
        </Container>
      );
    }

    if (status === 'resolved') {
      return (
        <Container>
          <Toaster />
          <Searchbar onSubmit={handleFormSubmit} />
          <ImageGallery images={images} />
          {images.length > 0 && totalImages !== images.length ? (
            <Button onClick={handleLoadMoreBtn} />
          ) : null}
        </Container>
      );
    }
  }
}

export default App;
