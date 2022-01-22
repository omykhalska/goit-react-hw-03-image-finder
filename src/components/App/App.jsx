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
    const { showNotification, handleApiResponse, handleError } = this;

    if (prevStates.query !== query) {
      this.setState({ status: 'pending', showModal: true, images: [] });
      await getImages(query, page)
        .then(({ data }) => {
          if (data.hits.length === 0) {
            showNotification('No images found! Try some other search keyword');
            this.setState({ status: 'idle', showModal: false });
            return;
          }

          handleApiResponse(data);
        })
        .catch(error => handleError(error));
    } else if (prevStates.page !== page) {
      await getImages(query, page)
        .then(({ data }) => {
          handleApiResponse(data);
        })
        .catch(error => handleError(error));
    }
  }

  handleApiResponse = response => {
    const filteredImages = [];
    const { hits, totalHits } = response;

    hits.forEach(({ tags, webformatURL, largeImageURL }) => {
      let imageData = {
        tags,
        webformatURL,
        largeImageURL,
      };
      filteredImages.push(imageData);
    });

    this.setState({
      images: [...this.state.images, ...filteredImages],
      totalImages: totalHits,
      status: 'resolved',
      showModal: false,
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

  renderPending = page => {
    const { images, showModal } = this.state;

    return (
      <>
        {page > 1 && <ImageGallery images={images} />}
        {showModal && (
          <Modal>
            <Loader />
          </Modal>
        )}
      </>
    );
  };

  renderResolved = () => {
    const { images, showModal, totalImages, activeImage } = this.state;
    const { handleImageClick, handleLoadMoreBtn, toggleModal } = this;

    return (
      <>
        <ImageGallery images={images} onClick={handleImageClick} />;
        {totalImages !== images.length && (
          <Button onClick={handleLoadMoreBtn} />
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={images[activeImage].largeImageURL} alt="hello" />
          </Modal>
        )}
      </>
    );
  };

  render() {
    const { handleFormSubmit, renderPending, renderResolved } = this;
    const { status, page } = this.state;

    const toastOptions = {
      style: {
        padding: '18px',
        color: '#D8000C',
        background: '#FFBABA',
      },
    };

    return (
      <Container>
        <Toaster toastOptions={toastOptions} />
        <Searchbar onSubmit={handleFormSubmit} />

        {status === 'pending' && renderPending(page)}

        {status === 'rejected' && (
          <ErrorText>Something went wrong... Try again later!</ErrorText>
        )}

        {status === 'resolved' && renderResolved()}
      </Container>
    );
  }
}

export default App;
