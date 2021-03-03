import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './DropLeft.module.scss';

export default function DropLeft({ render, setVisible, visible }) {
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
  return createPortal(
    <>
      <div
        className={
          visible
            ? styles.dropleft__overlay
            : [styles.dropleft__overlay, styles.hidden].join(' ')
        }
        onClick={toggle}
      />
      <div
        className={
          visible ? styles.dropleft : [styles.dropleft, styles.hidden].join(' ')
        }
        onClick={noneEvent}
      >
        <div className={styles.dropleft__content}>{render}</div>
      </div>
    </>,
    document.body,
  );
}

DropLeft.defaultProps = {
  render: <div>Render</div>,
  setVisible: () => {},
  visible: false,
};

DropLeft.propTypes = {
  render: PropTypes.node,
  setVisible: PropTypes.func,
  visible: PropTypes.bool,
};
