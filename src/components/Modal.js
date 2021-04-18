import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@/svg';
import styles from './Modal.module.scss';

export default function Modal({
  visible,
  setVisible,
  render,
  closeButtonDisplayNone,
  position,
}) {
  const toggle = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const noneEvent = useCallback((e) => e.stopPropagation(), []);

  const escapeKey = (e) => {
    if (e.key === 'Escape') {
      toggle();
    }
  };

  useEffect(() => {
    if (visible) window.addEventListener('keydown', escapeKey);
    else if (!visible) window.removeEventListener('keydown', escapeKey);
    return () => {
      window.removeEventListener('keydown', escapeKey);
    };
  }, [visible]);

  if (typeof window === 'undefined') return null;
  return visible && process.browser
    ? createPortal(
        // eslint-disable-next-line react/jsx-indent
        <>
          <div className={styles.modal__overlay} />
          <div onClick={toggle} className={styles.modal}>
            <div
              onClick={noneEvent}
              className={[
                styles[`modal--${position}`],
                styles.modal__content,
              ].join(' ')}
            >
              <div
                onClick={toggle}
                tabIndex={0}
                role="button"
                className={
                  closeButtonDisplayNone
                    ? [styles['modal--close'], styles.hidden].join(' ')
                    : styles['modal--close']
                }
              >
                <CloseIcon />
              </div>
              {render}
            </div>
          </div>
        </>,
        document.body,
    )
    : null;
}

Modal.defaultProps = {
  setVisible: () => {},
  closeButtonDisplayNone: false,
  position: 'center',
  render: <div>render</div>,
};

Modal.propTypes = {
  setVisible: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  render: PropTypes.node,
  closeButtonDisplayNone: PropTypes.bool,
  position: PropTypes.string,
};
