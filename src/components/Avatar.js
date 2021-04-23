import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.scss';

export default function Avatar(props) {
  return (
    <>
      {props.imgUrl
        ? <img src={props.imgUrl} className={styles.avatar__img} alt="user avatar" />
        : <div className={styles.avatar__color} />}
    </>  
  );
};


Avatar.defaultProps = {};

Avatar.propTypes = {
  imgUrl: PropTypes.string,
};