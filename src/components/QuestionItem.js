import React, { useCallback, useEffect, useState } from 'react';
import { BookmarkIcon, ThumbsUpIcon } from '@/svg';
import dayjs from 'dayjs';
import { handleAsync } from '@/utils/mobx';
import { Qna } from '@/utils/api';
import Tag from './Tag';
import styles from './QuestionItem.module.scss';

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

const QuestionItem = (props) => {
  const {
    question: {
      comments, tags, title, qnaType, createdAt, liked, bookmarked, user, id, likes,
    },
  } = props;

  const [curLiked, setCurLiked] = useState(liked);
  const [curBookmark, setCurBookmark] = useState(bookmarked);
  const [curLikes, setCurLikes] = useState(likes);

  const onBookmark = useCallback(async () => {
    const [res, err] = await handleAsync(Qna[curBookmark ? 'unbookmark' : 'bookmark']({ qnaId: id }));
    if (res) {
      setCurBookmark(!curBookmark);
    } else {
      console.log(err);
    }
  }, [bookmarked, curBookmark, setCurBookmark]);

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
    setCurBookmark(bookmarked);
  }, [bookmarked]);

  useEffect(() => {
    setCurLiked(liked);
  }, [liked]);

  useEffect(() => {
    setCurLikes(likes);
  }, [likes]);

  return (
    <div className={styles.questionItem}>
      <div className={styles.questionItem__content}>
        <div className={styles.questionItem__answers}>
          <span className={comments > 0 ? [styles.questionItem__answerCount, 'active'].join(' ') : styles.questionItem__answerCount}>{comments}</span>
          <span className={styles.questionItem__answerCountLabel}>Answers</span>
        </div>
        <div className={styles.questionItem__article}>
          <div>
            {tags.map((tag) => <Tag key={tag}><a href={`/tags/${tag}`}>{tag}</a></Tag>)}
          </div>
          <h1 className={styles.questionItem__title}><a href={title}>{title}</a></h1>
          <span className={styles.questionItem__category}>
            [
            {qnaType}
            ]
          </span>
        </div>
        <div className={styles.questionItem__user}>
          <div className={styles.questionItem__profile}>
            <img className={styles.questionItem__profileImage} src={user?.imgUrl} alt={user?.name} />
            <span className={styles.questionItem__level}>WHITE</span>
          </div>
          <span className={styles.questionItem__username}>{user?.name}</span>
          <span className={styles.questionItem__date}>{dayjs(createdAt).format('YYYY.MM.DD')}</span>
        </div>
      </div>
      <div className={styles.questionItem__actions}>
        <ActionButton className={curLiked ? 'active' : undefined} onClick={onLike}>
          <ThumbsUpIcon />
          <span className={styles.actionButton__thumbsUpCount}>{curLikes}</span>
        </ActionButton>

        <ActionButton className={curBookmark ? 'active' : undefined} onClick={onBookmark}>
          <BookmarkIcon />
        </ActionButton>
      </div>
    </div>
  );
};
export default QuestionItem;
