import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const { close, src, alt } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.closeModal}>
        <div className="Modal">
          <img src={src} alt={alt} onClick={close} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
