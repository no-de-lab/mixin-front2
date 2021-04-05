import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import throttle from 'lodash/throttle';
import DeveloperCard from '../../components/developerCard/DeveloperCard';
import styles from './index.module.scss';

export default function DeveloperPageLayout() {
  const DEVELOPER_COUNT = 10;
  const url = 'https://api.mix-in.net/api/dashboard';
  const [developerList, setDeveloperList] = useState([]);
  const currentPage = useRef(1);
  const getDeveloperList = async (url, page) => {
    try {
      const fetchUrl = `${url}?page=${page}`;
      const {
        data: { users },
      } = await axios.get(fetchUrl);
      const dl = developerList.concat(users);
      setDeveloperList(dl);
    } catch (e) {
      console.log(e);
    }
  };
  const handleScroll = useCallback(
    throttle(() => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 400
      ) {
        if (DEVELOPER_COUNT * currentPage.current === developerList.length) {
          currentPage.current += 1;
          console.log(developerList.length);
          getDeveloperList(url, currentPage.current);
        }
      }
    }, 250),
  );
  useEffect(() => {
    getDeveloperList(url, currentPage.current);
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [developerList]);

  if (developerList.length === 0) return null;
  console.log(developerList);
  return (
    <div className={styles.developer_layout}>
      <DeveloperCard developerList={developerList} />
    </div>
  );
}
