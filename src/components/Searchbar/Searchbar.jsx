import React, { Component } from 'react';
import toast from 'react-hot-toast';
import { ImSearch } from 'react-icons/im';
import {
  Wrapper,
  SearchForm,
  SearchFormBtn,
  SearchInput,
  Btn,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  onSearchBtnClick = e => {
    const { searchQuery } = this.state;

    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Enter something to search!');
      return;
    }

    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { onSearchBtnClick, handleQueryChange } = this;
    const { searchQuery } = this.state;

    return (
      <Wrapper>
        <SearchForm>
          <SearchFormBtn
            type="submit"
            aria-label="search"
            onClick={onSearchBtnClick}
          >
            <Btn />
          </SearchFormBtn>

          <SearchInput
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleQueryChange}
          />
        </SearchForm>
      </Wrapper>
    );
  }
}

export default Searchbar;
