import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { FilterIcon, SearchIcon } from '@/svg';
import styles from './RightSideBar.module.scss';
import SearchBar from './SearchBar';

const Modal = dynamic(() => import('./Modal'));
const DropLeft = dynamic(() => import('./DropLeft'));

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
        <Modal
          visible={toggleSearch}
          setVisible={setToggleSearch}
          position="full"
          render={<SearchBar cb={toggleSearchModal} />}
        />
        <DropLeft visible={toggleFilter} setVisible={setToggleFilter} />
      </div>
    </aside>
  );
}
