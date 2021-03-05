import React from 'react';
import styles from './Tag.module.scss';

const Tag = ({ children,  }) => (
  <span className={styles.tag}>
    <span className={styles.tag__text}>{ children }</span>
  </span>
);

export default Tag;
