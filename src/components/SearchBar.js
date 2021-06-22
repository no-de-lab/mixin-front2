import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { LargeSearchIcon } from '@/svg';

import styles from './SearchBar.module.scss';

export default function SearchBar({ cb }) {
  const [value, setValue] = useState('');
  const router = useRouter();

  // 엔터시 submit 막기
  const keyDownEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const onSearch = useCallback(() => {
    router.push(`/home?search=${value}`);
    if (cb) {
      cb();
    }
  }, [value]);

  const changeValue = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [value],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownEnter, true);
    return () => {
      document.removeEventListener('keydown', keyDownEnter, true);
    };
  }, []);

  return (
    <>
      <div className={styles.searchbar}>
        <input
          type="text"
          className={styles.searchbar__input}
          name="search"
          id="search"
          placeholder="Search"
          onChange={changeValue}
          value={value}
        />
        <LargeSearchIcon
          className={styles.searchbar__icons}
          handleClick={onSearch}
        />
      </div>
    </>
  );
}

SearchBar.defaultProps = {
  cb: () => {},
};
SearchBar.propTypes = {
  cb: PropTypes.func,
};
