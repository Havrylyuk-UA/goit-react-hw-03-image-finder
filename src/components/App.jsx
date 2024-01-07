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
        images: [...prevState.images, ...searchImages],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.fetchImagesAndUpdateState();
  }

  handleSearchImage = searchItem => {
    const { word } = searchItem;
    this.setState({ searchWord: word, page: 1, images: [] }, () => {
      this.fetchImagesAndUpdateState();
    });
  };

  handleAddPage = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchImagesAndUpdateState();
      }
    );
  };

  render() {
    const { images, isLoading, error } = this.state;

    return (
      <div className="App">
        <Searchbar handleSearchImage={this.handleSearchImage} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p style={{ textAlign: 'center' }}>Loading...</p>}
        <ImageGallery>
          {images.length > 0 &&
            images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                img={webformatURL}
                largeImg={largeImageURL}
                alt={tags}
              />
            ))}
        </ImageGallery>
        {images.length > 0 && <Button handleAddPage={this.handleAddPage} />}
      </div>
    );
  }
}
