import React, { useCallback, useState } from 'react';
import ProfileIcon from '@/svg/ProfileIcon';
import { CloseIcon } from '@/svg';
import styles from './comment.module.scss';

export default function CommentItem({ children, ...props }) {
  return <div className={styles.commentItem__container} {...props}>{children}</div>;
}

CommentItem.Box = function CommentItemBox({ children, ...props }) {
  return (
    <div className={styles.commentItem__box}>
      <div className={styles.commentItem__box__content}>{children}</div>
    </div>
  );
};

CommentItem.Button = function CommentItemButton({
  self, deleteComment, changeText, value,
}) {
  return (
    <div className={styles.commentItem__button} onClick={() => { changeText(value); }}>
      {self
        ? <div className={styles.commentItem__button__svg} onClick={deleteComment}><CloseIcon /></div> : <></>}
      답글
    </div>
    // <button className={styles.commentItem__button}>답글</button>
  );
};

CommentItem.Header = function CommentItemHeader({
  children, profileImg, profileName, date, ...props
}) {
  return (
    <div className={styles.commentItem__header}>
      {profileImg ? <img src={profileImg} className={styles.commentItem__header__content__img} alt="dd" /> : <ProfileIcon w="48" h="48" />}

      <div className={styles.commentItem__header__content}>
        <div className={styles.commentItem__header__content__name}>{profileName}</div>
        <div className={styles.commentItem__header__content__date}>{date.slice(0, 10)}</div>
      </div>
    </div>
  );
};

CommentItem.Content = function CommentItemContent({ children, content, ...props }) {
  return (<div className={styles.commentItem__content}>{children}</div>);
};
