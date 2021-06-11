import React from 'react';
import styles from './Avatar.module.scss';

export default function Avatar({imgUrl, ...props}) {
  return (
    <>
      {
        imgUrl
          ? <img src={imgUrl} className={styles.avatar__img} alt="user avatar" />
          : <div className={styles.avatar__color}></div>
      }
    </>
  );
};