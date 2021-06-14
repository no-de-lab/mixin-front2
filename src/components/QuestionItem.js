import React, { useEffect, useState } from 'react';
import { BookmarkIcon, ThumbsUpIcon } from '@/svg';
import dayjs from 'dayjs';
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
      comments, tags, title, qnaType, createdAt, liked, bookmarked, user: { imgUrl, name },
    },
  } = props;
  const [curLiked, setCurLiked] = useState(liked);
  const [curBookmarked, setCurBookmarked] = useState(bookmarked);

  useEffect(() => {
    setCurBookmarked(bookmarked);
  }, [curBookmarked]);

  useEffect(() => {
    setCurLiked(liked);
  }, [curLiked]);

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
            <img className={styles.questionItem__profileImage} src={imgUrl} alt={name} />
            <span className={styles.questionItem__level}>WHITE</span>
          </div>
          <span className={styles.questionItem__username}>{name}</span>
          <span className={styles.questionItem__date}>{dayjs(createdAt).format('YYYY.MM.DD')}</span>
        </div>
      </div>
      <div className={styles.questionItem__actions}>
        <ActionButton className={curLiked ? 'active' : undefined} onClick={() => setCurLiked(!curLiked)}>
          <ThumbsUpIcon />
          <span className={styles.actionButton__thumbsUpCount}>0</span>
        </ActionButton>

        <ActionButton className={curLiked ? 'active' : undefined} onClick={() => setCurBookmarked(!curBookmarked)}>
          <BookmarkIcon />
        </ActionButton>
      </div>
    </div>
  );
};
export default QuestionItem;
