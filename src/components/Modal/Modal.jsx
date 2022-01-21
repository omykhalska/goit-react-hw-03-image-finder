import React, { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export default class Modal extends Component {
  render() {
    return (
      <Overlay>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>
    );
  }
}
