import React from 'react';
import { LightThemeIcon } from '@/svg';
import styles from './LeftSideBar.module.scss';

export default function LeftSideBar() {
  return (
    <aside className={styles.left_sidebar}>
      <LightThemeIcon name="theme" w="40" h="40" />
    </aside>
  );
}
