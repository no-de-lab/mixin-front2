import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useRouter } from 'next/router';
import throttle from 'lodash/throttle';
import CONFIG from '../config/AppConfig';

const useInfiniteScroll = (fetcher, loading, setLoading) => {
  // { search, page, offset; }
  const [hasMore, setHasMore] = useState(true);
  const [issues, setIssues] = useState([]);

  const page = useRef(1);
  const { search } = useRouter().query;

  const loadMoreData = async () => {
    console.log('start', loading);
    if (!loading && hasMore) {
      setLoading(true);

      // 불러오기 -> 다음에 불러올 데이터가 있는가?
      await fetcher({ search, page: page.current, offset: CONFIG.INFINITE_SCROLL_OFFSET })
        .then((res) => {
          console.log('page', page.current);
          if(page.current === res.data.currentPage) {
            setIssues((prevState) => [...prevState].concat(res.data.articles));
            page.current = res.data.currentPage + 1;
          }
          setHasMore(res.data.currentPage < res.data.endPageNumber);
        })
        .finally(() => { setLoading(false); });
      console.log('end');
    }
  };

  // 스크롤이 하단에 놓이면 fetching 실행
  const handleScroll = useCallback(
    throttle(() => {
      if (
        window.scrollY + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 200
      ) {
        loadMoreData();
      }
    }, 250),
    [],
  );

  // 첫 페이지 렌더링시 가져오기
  useEffect(() => {
    if(issues.length < 1) {
      loadMoreData();
    }
  }, [])

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [issues];
};

export default useInfiniteScroll;
