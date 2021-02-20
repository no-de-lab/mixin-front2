import React, { useState, useCallback } from 'react';
import { FilterIcon, SearchIcon } from '@/svg';
import styles from './RightSideBar.module.scss';

export default function RightSideBar() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);

  const toggleSearchModal = useCallback(() => {
    setToggleSearch(!toggleSearch);
  }, [toggleSearch, setToggleSearch]);

  const toggleFilterModal = useCallback(() => {
    setToggleFilter(!toggleFilter);
  }, [toggleFilter, setToggleFilter]);

  return (
    <aside className={styles.right_sidebar}>
      <div className={styles['right_sidebar--tool_box']}>
        <SearchIcon handleClick={toggleSearchModal} />
        <FilterIcon handleClick={toggleFilterModal} />
      </div>
    </aside>
  );
}