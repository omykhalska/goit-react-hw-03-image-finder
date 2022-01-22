import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Searchbar from '../Searchbar/';
import ImageGallery from '../ImageGallery';
import Button from '../Button/';
import Loader from '../Loader';
import Modal from '../Modal';
import { Container, ErrorText } from './App.styled';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { getImages } from '../../services/searchImagesApi';

class App extends Component {
  state = {
    query: '',
    images: [],
    totalImages: 0,
    activeImage: 0,
    page: 1,
    status: 'idle',
    showModal: false,
  };

  async componentDidUpdate(_, prevStates) {
    const { page, query } = this.state;
    const { showNotification, filterApiResponse, handleError } = this;
    let filteredImages = [];

    if (prevStates.query !== query) {
      this.setState({ status: 'pending', showModal: true });

      await getImages(query, page)
        .then(({ data: { hits, totalHits } }) => {
          if (hits.length === 0) {
            showNotification('No images found! Try some other search keyword');
            this.setState({ status: 'idle', images: [], showModal: false });
            return;
          }

          filterApiResponse(hits, filteredImages);

          this.setState({
            images: filteredImages,
            totalImages: totalHits,
            status: 'resolved',
            showModal: false,
          });
        })
        .catch(error => handleError(error));
    } else if (prevStates.page !== page) {
      this.setState({ status: 'pending', showModal: true });

      await getImages(query, page)
        .then(({ data: { hits } }) => {
          filterApiResponse(hits, filteredImages);

          this.setState(({ images }) => ({
            images: [...images, ...filteredImages],
            status: 'resolved',
            showModal: false,
          }));
        })
        .catch(error => handleError(error));
    }
  }

  filterApiResponse = (response, arr) => {
    response.forEach(({ tags, webformatURL, largeImageURL }) => {
      let imageData = {
        tags,
        webformatURL,
        largeImageURL,
      };
      return arr.push(imageData);
    });
  };

  handleError = ({ message }) => {
    console.log(message);
    this.setState({ status: 'rejected' });
  };

  handleLoadMoreBtn = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleFormSubmit = query => {
    this.setState({ query, page: 1 });
  };

  showNotification = text => {
    toast.error(text);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleImageClick = index => {
    this.setState({ activeImage: index });
    this.toggleModal();
  };

  render() {
    const {
      handleFormSubmit,
      handleLoadMoreBtn,
      toggleModal,
      handleImageClick,
    } = this;
    const { images, totalImages, status, page, showModal, activeImage } =
      this.state;

    const toastOptions = {
      style: {
        padding: '18px',
        color: '#D8000C',
        background: '#FFBABA',
      },
    };

    if (status === 'idle') {
      return (
        <Container>
          <Toaster toastOptions={toastOptions} />
          <Searchbar onSubmit={handleFormSubmit} />
        </Container>
      );
    }

    if (status === 'pending') {
      if (page > 1) {
        return (
          <Container>
            <Toaster toastOptions={toastOptions} />
            <Searchbar onSubmit={handleFormSubmit} />
            <ImageGallery images={images} />

            {showModal && (
              <Modal>
                <Loader />
              </Modal>
            )}
          </Container>
        );
      } else {
        return (
          <Container>
            <Toaster toastOptions={toastOptions} />
            <Searchbar onSubmit={handleFormSubmit} />

            {showModal && (
              <Modal>
                <Loader />
              </Modal>
            )}
          </Container>
        );
      }
    }

    if (status === 'rejected') {
      return (
        <Container>
          <Searchbar onSubmit={handleFormSubmit} />
          <ErrorText>Something went wrong... Try again later!</ErrorText>
        </Container>
      );
    }

    if (status === 'resolved') {
      return (
        <Container>
          <Toaster toastOptions={toastOptions} />
          <Searchbar onSubmit={handleFormSubmit} />
          <ImageGallery images={images} onClick={handleImageClick} />

          {totalImages !== images.length && (
            <Button onClick={handleLoadMoreBtn} />
          )}

          {showModal && (
            <Modal onClose={toggleModal}>
              <img src={images[activeImage].largeImageURL} alt="hello" />
            </Modal>
          )}
        </Container>
      );
    }
  }
}

export default App;
