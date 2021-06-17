import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@/svg/CloseIcon';

import useInput from '@/utils/hooks/useInput';
import { handleAsync } from '@/utils/mobx';
import { Article } from '@/utils/api';
import Toast from '@/components/Toast';
import { useStore } from '../../../modules';
import CommentCard from './CommentCard';
import CommentItems from './CommentItems';
import styles from './comment.module.scss';

export default function CrawlCardComment({
  article, visible, setVisible, comments,
}) {
  const { authStore } = useStore();
  const [curComments, setCurComments] = useState(comments);
  const [comment, setComment, resetComment] = useInput('');

  const addComment = useCallback(async () => {
    if (!authStore?.user?.id) {
      Toast.warn('로그인 후 이용해주세요');
      return;
    }

    if (comment.length < 1) {
      return;
    }

    const [res, err] = await handleAsync(Article.addComment({ comment, articleId: article.id }));
    if (res) {
      setCurComments([...curComments, res?.data]);
      resetComment();
    } else {
      console.log(err);
    }
  }, [comment, setComment, curComments, setCurComments, resetComment]);

  const deleteComment = useCallback((commentId) => async () => {
    const [res, err] = await handleAsync(Article.deleteComment({ commentId }));
    if (res) {
      console.log('commentId', commentId);
      console.log('delete comment', res);
      const filteredComments = curComments.filter((comment) => comment.id !== commentId);
      console.log(filteredComments, filteredComments);
      setCurComments(filteredComments);
    } else {
      console.log(err);
    }
  }, [comment, setComment, curComments, setCurComments, resetComment]);

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

  useEffect(() => {
    setCurComments(comments);
  }, [comments]);
  // const hideComment = useCallback((e) => e.stopPropagation(), []);

  return (
    <>
      <div className={visible ? styles.comment__total__box : styles.comment__hidden} onClick={() => setVisible(!visible)} />
      <div className={visible ? styles.comment__container : styles.comment__hidden}>
        <div className={styles.commentCard__container}>
          <div className={styles.comment__container__close}>
            <div onClick={() => { setVisible(!visible); }} className={styles.comment__container__close__svg}>
              <CloseIcon />
            </div>
          </div>
          <CommentCard article={article} />
        </div>
        <CommentItems comments={curComments} deleteComment={deleteComment} setComment={setComment} />
        <div className={styles.comment__paragraph}>
          <textarea placeholder="paragraph" value={comment} onChange={setComment} />
          <button type="button" onClick={addComment}>write</button>
        </div>
      </div>
    </>
  );
}
