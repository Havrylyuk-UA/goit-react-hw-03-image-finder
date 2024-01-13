import React, { Component } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import api from '../services/api';

import './styles.css';

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    searchWord: '',
    page: 1,
    per_page: 12,
    modalOpen: false,
    imageDetails: {},
    search: null,
    canFind: false,
  };

  fetchImagesAndUpdateState = async () => {
    const { images, searchWord, page, per_page } = this.state;

    try {
      this.setState({
        isLoading: true,
        search: null,
        canFind: false,
      });

      const searchImages = await api.fetchImages(searchWord, page, per_page);

      if (searchImages.hits.length === 0) {
        this.setState({
          isLoading: true,
          search: null,
          canFind: true,
        });
      }

      this.setState({
        images: [...images, ...searchImages.hits],
      });
      this.updateLimit(searchImages.totalHits);
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  updateLimit = totalHits => {
    const { page, per_page } = this.state;
    const limit = Math.ceil(totalHits / per_page);

    this.setState({ search: page < limit });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchWord } = this.state;

    if (page !== prevState.page || searchWord !== prevState.searchWord) {
      await this.fetchImagesAndUpdateState();
    }
  }

  handleSearchImage = searchItem => {
    if (searchItem === '') {
      return this.setState({ canFind: true, search: null, images: [] });
    }
    this.setState({ searchWord: searchItem, page: 1, images: [] });
  };

  handleAddPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  showModal = ({ largeImg, alt }) => {
    this.setState({
      modalOpen: true,
      imageDetails: {
        largeImg,
        alt,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      imageDetails: {},
    });
  };

  render() {
    const {
      images,
      isLoading,
      error,
      search,
      modalOpen,
      imageDetails,
      canFind,
    } = this.state;

    return (
      <div className="App">
        <Searchbar handleSearchImage={this.handleSearchImage} />
        {error && (
          <p style={{ textAlign: 'center' }}>
            Whoops, something went wrong: {error.message}
          </p>
        )}
        {canFind && (
          <p style={{ textAlign: 'center' }}>
            Sorry, I couldn't find pictures for your entry or the input field is
            empty, please try again.
          </p>
        )}
        <ImageGallery>
          {images.length > 0 &&
            images.map(({ webformatURL, largeImageURL, tags }, i) => (
              <ImageGalleryItem
                key={i}
                img={webformatURL}
                largeImg={largeImageURL}
                alt={tags}
                showModal={this.showModal}
              />
            ))}
        </ImageGallery>
        {isLoading && <Loader />}
        {search && <Button handleAddPage={this.handleAddPage} />}
        {modalOpen && (
          <Modal
            close={this.closeModal}
            alt={imageDetails.alt}
            src={imageDetails.largeImg}
          />
        )}
      </div>
    );
  }
}
