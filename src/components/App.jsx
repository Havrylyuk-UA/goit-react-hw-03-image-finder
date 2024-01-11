import React, { Component } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
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
  };

  fetchImagesAndUpdateState = async () => {
    const { searchWord, page, per_page } = this.state;

    try {
      const searchImages = await api.fetchImages(searchWord, page, per_page);

      this.setState(prevState => ({
        images: [...prevState.images, ...searchImages.hits],
      }));
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
    this.setState({ searchWord: searchItem, page: 1, images: [] }, () => {
      this.fetchImagesAndUpdateState();
    });
  };

  handleAddPage = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1, isLoading: true }),
      () => {
        this.fetchImagesAndUpdateState();
      }
    );
  };

  render() {
    const { images, isLoading, error, search } = this.state;

    return (
      <div className="App">
        <Searchbar handleSearchImage={this.handleSearchImage} />
        {error && (
          <p style={{ textAlign: 'center' }}>
            Whoops, something went wrong: {error.message}
          </p>
        )}
        {isLoading && <p style={{ textAlign: 'center' }}>Loading...</p>}
        <ImageGallery>
          {images.length > 0 &&
            images.map(({ webformatURL, largeImageURL, tags }, i) => (
              <ImageGalleryItem
                key={i}
                img={webformatURL}
                largeImg={largeImageURL}
                alt={tags}
              />
            ))}
        </ImageGallery>
        {search && <Button handleAddPage={this.handleAddPage} />}
      </div>
    );
  }
}
