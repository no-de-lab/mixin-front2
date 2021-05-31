import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@/svg/CloseIcon';

import CommentCard from './CommentCard';
import CommentItems from './CommentItems';
import styles from './comment.module.scss';

export default function CrawlCardComment({ data, visible, setVisible }) {
  const toggle = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const noneEvent = useCallback((e) => e.stopPropagation(), []);

  const escapeKey = (e) => {
    if (e.key === 'Escape') {
      toggle();
    }
  };
  useEffect(() => {
    if (visible) window.addEventListener('keydown', escapeKey);
    else if (!visible) window.removeEventListener('keydown', escapeKey);
    return () => {
      window.removeEventListener('keydown', escapeKey);
    };
  }, [visible]);
  // const hideComment = useCallback((e) => e.stopPropagation(), []);

  return (
    <div className={visible ? styles.comment__container : styles.comment__hidden}>
      <div className={styles.commentCard__container}>
        <div className={styles.comment__container__close}>
          <div onClick={() => { setVisible(!visible); }} className={styles.comment__container__close__svg}>
            <CloseIcon />
          </div>
        </div>
        <CommentCard dummy={data} />
      </div>
      <CommentItems data={data} />
      <div className={styles.comment__paragraph}>
        <textarea placeholder="paragraph" />
        <button>write</button>
      </div>
    </div>
  );
}
