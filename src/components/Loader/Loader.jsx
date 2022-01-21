import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

export default function Loader() {
  return (
    <BallTriangle
      heigth="100"
      width="100"
      color="grey"
      arialLabel="loading-indicator"
    />
  );
}
