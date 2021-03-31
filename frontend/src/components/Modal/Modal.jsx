import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop/Backdrop'
import { CSSTransition } from 'react-transition-group';

import './Modal.css';

const ModalOverlay = props => {

  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
        <div style={{padding: `${[props.size]}`}} className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <button type="submit"/>
      </form>

    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;