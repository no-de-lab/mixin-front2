import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import Avatar from '@/components/Avatar';
import styles from './index.module.scss';

const ProfileBody = ({ children, sticky }) => (
  <div className={[styles.profile_body, sticky && styles.sticky].filter(Boolean).join(' ')}>
    {children}
  </div>
);

const Tabs = (props) => {
  const { path, prefix } = props;
  const router = useRouter();
  const href = `/${path}`;
  const current = router.pathname === `${prefix}${href}`;
  return (
    <Link href={`${prefix}${href}`}>
      <span data-current={current} className={styles.profile_tabs__item}>
        {path.toLocaleUpperCase()}
      </span>
    </Link>
  );
};

function ProfileLayout({ user, ...props }) {
  const [sticky, setSticky] = useState(false);
  const [auth, setAuth] = useState(undefined);
  const tabs = ['profile', 'questions', 'answers', 'bookmark'];
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().bottom <= 1);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);
  useEffect(() => {
    setAuth(user);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.profile_header} ref={ref}>
        <Avatar imgUrl={user.imgUrl} />
        <p className={styles.profile_header__name}>{auth?.name || ''}</p>
        <p className={styles.profile_header__job}>[ JOB ]</p>
        <p className={styles.profile_header__rank}>RANK</p>
        <div className={[styles.profile_header__urls, 'flex w-30 my-3'].join(' ')}>
          {/* TODO : url list with api */}
          {['url_default', 'url_git', 'url_home'].map((url) => (
            <div className={styles.icons} key={url}>
              <Image
                src={`/images/svg/${url}.svg`}
                alt={url}
                width={20}
                height={20}
              />
            </div>
          ))}
        </div>
        <p className={styles.profile_header__comment}>
          {auth?.introduction || '한 줄 소개'}
        </p>
      </div>
      <div className={[styles.profile_tabs, sticky && styles.sticky].filter(Boolean).join(' ')}>
        {tabs.map((tab) => <Tabs key={tab} path={tab} prefix="/mypage" />)}
      </div>
      <ProfileBody sticky={sticky}>{props.children}</ProfileBody>
    </div>
  );
}

export default observer(ProfileLayout);
