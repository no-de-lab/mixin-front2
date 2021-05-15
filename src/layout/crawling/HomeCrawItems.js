/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React from 'react';
import CrawlCardLayout from '@/components/Card/Crawling/index';
// import PropTypes from 'prop-types';
import styles from './HomeLayout.module.scss';

export default function HomeCrawlItems({ articles }) {
  return (
    <>
      {articles.map((article, i) => (
        <div key={i} className={styles.crawlItems__container}>
          <CrawlCardLayout article={article} />
        </div>
      ))}
    </>
  );
}
