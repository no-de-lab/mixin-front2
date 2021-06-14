import React, { useState, useEffect } from 'react';
import styles from './Avatar.module.scss';

export default function Avatar({ imgUrl }) {
  const [URL, setURL] = useState(undefined);
  useEffect(() => {
    setURL(imgUrl);
  }, []);
  return (
    <>
      {
        URL
          ? <img src={imgUrl} className={styles.avatar__img} alt="user avatar" />
          : <div className={styles.avatar__color} />
      }
    </>
  );
}
