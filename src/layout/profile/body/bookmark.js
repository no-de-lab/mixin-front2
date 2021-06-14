import React from 'react';
import { observer } from 'mobx-react-lite';
import HomeCrawlItems from '../../crawling/HomeCrawItems';
import styles from '../../crawling/HomeLayout.module.scss';

function Bookmark(props) {
  const { articles } = props;
  return (
    <div className={styles.crawl__box}>
      <HomeCrawlItems articles={articles} />
    </div>
  );
}

export default observer(Bookmark);
