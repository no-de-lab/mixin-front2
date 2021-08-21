import { SmallCloseIcon, ProfileIcon, LikeIcon } from '@/svg';
import { Qna } from '@/utils/api';
import { handleAsync } from '@/utils/mobx';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from '../../../modules';
import styles from './CommentContent.module.scss';

const ActionButton = ({
  children, label, className, onClick,
}) => {
  const classNames = [styles.actionButton, className].join(' ');
  return (
    <button type="button" aria-label={label} className={classNames} onClick={onClick}>
      { children }
    </button>
  );
};

const CommentContent = observer(({ comment, deleteComment }) => {
  const { authStore } = useStore();
  const {
    user, createdAt, likes, liked, id,
  } = comment;

  const [curLiked, setCurLiked] = useState(liked);
  const [curLikes, setCurLikes] = useState(likes);

  const onLike = useCallback(async () => {
    const [res, err] = await handleAsync(Qna[curLiked ? 'unlike' : 'like']({ qnaId: id }));
    if (res) {
      curLiked ? setCurLikes((prev) => prev - 1) : setCurLikes((prev) => prev + 1);
      setCurLiked(!curLiked);
    } else {
      console.log(err);
    }
  }, [liked, curLiked, setCurLiked, likes, curLikes, setCurLikes]);

  useEffect(() => {
    setCurLiked(liked);
  }, [liked]);

  useEffect(() => {
    setCurLikes(likes);
  }, [likes]);

  const style = {
    background: `url(${user?.imgUrl}) center center / cover no-repeat #ccc`
  }

  return (
    <div className={styles.content__container}>
      <div className={styles.comment__profile_img_wrap}>
        {user?.imgUrl ? <div className={styles.comment__profile_img} style={style} /> : <ProfileIcon />}
      </div>
      <div className={styles.comment__content}>
        <div className={styles.comment__header_writer}>
          <div className={styles['comment__header_writer-info']}>
            <h6>{user?.name}</h6>
            <span>{dayjs(createdAt).format('YYYY.MM.DD')}</span>
          </div>
        </div>
        <div className={styles.comment__body_content}>
          {comment?.comment}
        </div>
        <div className={styles.comment__footer_content}>
          <ActionButton className={curLiked ? 'active' : ''} onClick={onLike}>
            <LikeIcon />
            <span className={styles.actionButton__thumbsUpCount}>{curLikes}</span>
          </ActionButton>
          {authStore?.user?.id === comment.user?.id && (
          <ActionButton onClick={deleteComment(id)}>
            <SmallCloseIcon />
          </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
});

export default CommentContent;
