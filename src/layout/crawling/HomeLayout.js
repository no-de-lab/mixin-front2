import React from 'react';
import HomeCrawlItems from './HomeCrawItems';
import styles from './HomeLayout.module.scss';


export default function HomeLayout() {
   
    return (
      <>
        <div className={styles.crawl__container}>
          <div className={styles.crawl__box}>
            <HomeCrawlItems />
          </div>
        </div>
      </>
      );

}