import React from 'react';
import styles from './index.module.scss';

const QnaListLayout = ({ children }) => (
  <div className={styles.qnaList__container}>
    { children }
  </div>
);

export default QnaListLayout;
