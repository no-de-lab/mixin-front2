/* eslint-disable no-nested-ternary */
import React from 'react';
import CrawlCardLayout from '@/components/Card/Crawling/index';
// import PropTypes from 'prop-types';
import styles from './HomeLayout.module.scss';

export default function HomeCrawlItems() {
    return (
      <>
        {/* {issues.map(issue => ( */}
        <div className={styles.crawlItems__container}>
          <CrawlCardLayout />
        </div>
        {/* ))} */}
      </>
      );
}

