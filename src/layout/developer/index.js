import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import throttle from 'lodash/throttle';
import { Developer } from '@/utils/api';
import { handleAsync } from '@/utils/mobx';
import { Spinner } from '@/components/Spinner';
import { useStore } from '../../modules';
import DeveloperCard from '../../components/developerCard/DeveloperCard';
import styles from './index.module.scss';

function DeveloperLayout() {
  const { authStore } = useStore();
  const DEVELOPER_COUNT = 10;
  const [developerList, setDeveloperList] = useState([]);
  const [endPage, setEndPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentPage = useRef(1);

  // page 별 Developer 리스트 가져오기
  const getDeveloperList = async () => {
    try {
      setLoading(true);
      const fetcher = authStore.user?.id ? Developer.authAll : Developer.all;
      const [res] = await handleAsync(fetcher(currentPage.current));
      const { data: { users } } = res;
      setEndPage(res.data.endPageNumber);
      const dl = developerList.concat(users);
      setDeveloperList(dl);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // 스크롤 다운 시 Developer 리스트 추가
  const handleScroll = useCallback(
    throttle(() => {
      if (
        window.scrollY + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 400
      ) {
        if (currentPage.current < endPage) {
          if (DEVELOPER_COUNT * currentPage.current === developerList.length) {
            currentPage.current += 1;
            getDeveloperList(currentPage.current);
          }
        }
      }
    }, 250),
  );

  useEffect(() => {
    getDeveloperList();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [developerList]);

  if (developerList.length === 0) return null;
  return (
    <>
      <div className={styles.developer_layout}>
        {developerList.map((developer) => (
          <DeveloperCard key={developer.id} developer={developer} />
        ))}
      </div>
      {loading && <div><Spinner /></div>}
    </>
  );
}

export default DeveloperLayout;
// export default inject('store')(observer(DeveloperLayout));
