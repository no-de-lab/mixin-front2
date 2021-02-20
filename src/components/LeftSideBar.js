import React from 'react';
import ThemeSwitch from './ThemeSwitch';

import styles from './LeftSideBar.module.scss';

export default function LeftSideBar() {
  return (
    <aside className={styles.left_sidebar}>
      <ThemeSwitch />
    </aside>
  );
}
