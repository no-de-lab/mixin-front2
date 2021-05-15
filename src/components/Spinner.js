import React from 'react';

import styles from './Spinner.module.scss';

export const Spinner = () => (
  <div className={styles['spin-group']}>
    <div className={styles['double-spinner']} />
  </div>
);
