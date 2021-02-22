import React, {useState, useRef, useEffect} from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

/*
  TODO: mypage
    - fix header
    - connect mobx
    - style

*/

const Avatar = (props) => {
  const img = '';
  const {imgUrl} = props;
  return (
    <>
      {img 
        ? <img src={imgUrl} className={styles.avatar__img} alt="user avatar" />
        : <div className={styles.avatar__color} />}
    </>  
  );
};
const ProfileBody = ({children, sticky}) => (
  <div className={[styles.profile_body, sticky && styles.sticky].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export default function ProfileLayout(props) {
  const {children, comment} = props;
  const [sticky, setSticky] = useState(false);
  const tabs = ['profile', 'questions', 'answers', 'bookmark'];
  // #0D0D0D
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
  return (
    <div className={styles.container}>
      <div className={styles.profile_header} ref={ref}>
        <Avatar />
        <p className={styles.profile_header__name}>name</p>
        <p className={styles.profile_header__job}>job</p>
        <p className={styles.profile_header__rank}>rank</p>
        <p className={styles.profile_header__urls}>url icons</p>
        <p className={styles.profile_header__comment}>
          {comment || '한 줄 소개'}
        </p>
      </div>
      <div className={[styles.profile_tabs, sticky && styles.sticky].filter(Boolean).join(' ')}>
        {tabs.map((tab) => (
          <Link key={tab} href={`/mypage/${tab === 'profile' ? '/' : tab}`}>
            <span className={styles.profile_tabs__item}>{tab.toLocaleUpperCase()}</span>
          </Link>
        ))}
      </div>
      <ProfileBody sticky={sticky}>{children}</ProfileBody>
    </div>
  );
}
