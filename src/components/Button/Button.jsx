import React from 'react';
import { LoadMoreBtn } from './Button.styled';

function Button({ onClick }) {
  return (
    <LoadMoreBtn type="button" onClick={onClick}>
      Load more
    </LoadMoreBtn>
  );
}

export default Button;
