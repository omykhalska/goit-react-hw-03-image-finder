import React, { Component } from 'react';
import {
  Wrapper,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  render() {
    return (
      <Wrapper>
        <SearchForm>
          <SearchFormBtn type="submit">
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeHolder="Search images and photos"
          />
        </SearchForm>
      </Wrapper>
    );
  }
}

export default Searchbar;
