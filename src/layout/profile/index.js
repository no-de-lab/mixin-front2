import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

const Avatar = (props) => {
  const img = '';
  return (
    <>
      {img 
        ? <img src={props.imgUrl} className={styles.avatar__img}/>
        : <div className={styles.avatar__color}></div>
      }
    </>  
  )
}
const ProfileBody = ({children}) => (
  <div className={styles.profile_body}>
    {children}
  </div>
)
export default function ProfileLayout(props, {children}) {
  const tabs = ['profile', 'questions', 'answers', 'bookmark'];
  // #0D0D0D
  return (
    <>
      <div className={styles.profile_header}>
        <Avatar />
        <p className={styles.profile_header__name}>name</p>
        <p className={styles.profile_header__job}>job</p>
        <p className={styles.profile_header__rank}>rank</p>
        <p className={styles.profile_header__urls}>url icons</p>
        <p className={styles.profile_header__comment}>
          {props.comment 
            ? props.comment 
            : '한 줄 소개'
          }
        </p>
        <div className={styles.profile_tabs}>
          {tabs.map((tab, i) => (
            <Link key={i} href={`/mypage/${tab === 'profile' ? '/' : tab}`}>
              <a className={styles.profile_tabs__item}>{tab.toLocaleUpperCase()}</a>
            </Link>
          ))}
        </div>
      </div>
      <ProfileBody>{children}</ProfileBody>
    </>
  );
}
