import React, { useEffect, useState } from 'react';
import { Spinner } from '@/components/Spinner';
import { Article } from '@/utils/api';
import useInfiniteScroll from '@/utils/hooks/useInfiniteScroll';
import { handleAsync } from '@/utils/mobx';
import HomeCrawlItems from './HomeCrawItems';
import styles from './HomeLayout.module.scss';

export default function HomeLayout() {
  // const a = useInfiniteScroll(Article.all);
  const [loading, setLoading] = useState(false);
  const [issues] = useInfiniteScroll(Article.all, loading, setLoading);
  return (
    <>
      <div className={styles.crawl__container}>
        <div className={styles.crawl__box}>
          <HomeCrawlItems articles={issues} />
        </div>
      </div>
      {loading && <div><Spinner /></div>}
    </>
  );
}
