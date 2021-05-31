import React, { useEffect } from 'react';
import styles from '@/components/Card/Crawling/crawlCard.module.scss';

export default function CommentIcon({ count, onClick }) {
  const toggle = () => {
    onClick();
  };

  useEffect(() => {
  }, [toggle]);
  return (
    <>
      <div className={styles.card__comment__container} onClick={toggle}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M2 4H11.0625V5H3V18H5.24031L7 20.1996L8.75969 18H21V5H12.9375V4H22V19H9.24031L7 21.8004L4.75969 19H2V4Z" fill="#DCDCDC" />
        </svg>
        <span className={styles.card__comment__count}>{count}</span>
      </div>

    </>
  );
}
