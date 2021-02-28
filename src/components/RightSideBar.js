import React, { useState, useCallback } from 'react';
import { FilterIcon, SearchIcon } from '@/svg';
import styles from './RightSideBar.module.scss';
import Modal from './Modal';
import SearchBar from './SearchBar';
import DropLeft from './DropLeft';

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
      <Modal
        visible={toggleSearch}
        setVisible={setToggleSearch}
        position="full"
        render={<SearchBar cb={toggleSearchModal} />}
      />
      <DropLeft visible={toggleFilter} setVisible={setToggleFilter} />
    </aside>
  );
}
