import { Component } from 'react';
import searchImg from './free-icon-loupe-751463.png';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: '',
    };
  }

  handlePushWord = e => {
    e.preventDefault();
    const { handleSearchImage } = this.props;

    const { word } = this.state;

    const searchItem = {
      word: word,
    };

    handleSearchImage(searchItem);
  };

  handleChangeWord = e => {
    this.setState({ word: e.target.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handlePushWord}>
          <button type="submit" className="SearchForm-button">
            <img
              src={searchImg}
              alt="searc-img"
              width={20}
              height={20}
              className="serarch-ico"
            />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeWord}
          />
        </form>
      </header>
    );
  }
}
