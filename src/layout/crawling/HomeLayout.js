import React, { useState } from 'react';
import { Spinner } from '@/components/Spinner';
import { Article } from '@/utils/api';
import useInfiniteScroll from '@/utils/hooks/useInfiniteScroll';
import { observer } from 'mobx-react-lite';
import HomeCrawlItems from './HomeCrawItems';
import styles from './HomeLayout.module.scss';
import { useStore } from '../../modules';

export default observer(() => {
  // const a = useInfiniteScroll(Article.all);
  const { authStore } = useStore();
  const [loading, setLoading] = useState(false);
  const [issues] = useInfiniteScroll(authStore.user
    ? Article.authAll : Article.all, loading, setLoading);
  return (
    <>
      <div className={styles.crawl__container}>
        <div className={styles.crawl__box}>
          <HomeCrawlItems articles={issues} />
        </div>
        {loading && <div><Spinner /></div>}
      </div>
    </>
  );
});
