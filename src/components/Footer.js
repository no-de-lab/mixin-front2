import React from 'react';
import Link from 'next/link';

import ROUTE from '@/constant/route';

import CONFIG from '@/config/AppConfig';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__item}>
        <Link href={`/${ROUTE.TERMS_OF_SERVICE}`}>
          <a className={styles['footer__item--content']}>서비스 이용약관</a>
        </Link>
      </div>
      <div className={styles.footer__item}>
        <Link href={`/${ROUTE.PRIVACY_POLICY}`}>
          <a className={styles['footer__item--content']}>개인정보 처리방침</a>
        </Link>
      </div>
      <div className={styles.footer__item}>
        <div>
          <span className={styles['footer__item--title']}>단체명</span>
          <span className={styles['footer__item--content']}>노드랩</span>
        </div>
      </div>
      <div className={styles.footer__item}>
        <div>
          <span className={styles['footer__item--title']}>대표자</span>
          <span className={styles['footer__item--content']}>이재규</span>
        </div>
      </div>
      <div className={styles.footer__item}>
        <a
          className={styles['footer__item--content']}
          href={`mailto:${CONFIG.SUPPORT_EMAIL}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          nodelab.mixin@gmail.com
        </a>
      </div>
    </footer>
  );
}
