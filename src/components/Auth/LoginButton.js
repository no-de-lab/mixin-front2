import React from 'react';
import PropTypes from 'prop-types';
import styles from './Auth.module.scss';
// 로그인 버튼 레이아웃

export default function LoginButton({ children, imgIcon, ...props }) {
  return (
    <button className={styles.login__button} {...props}>
      {imgIcon}
      <p className={styles.login__text}>{children}</p>
    </button>
  );
}

LoginButton.propTypes = {
  children: PropTypes.string.isRequired,
  imgIcon: PropTypes.node.isRequired,
};
