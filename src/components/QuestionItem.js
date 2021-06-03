import React, { useState } from 'react';
import { BookmarkIcon, ThumbsUpIcon } from '@/svg';
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
      comments, tags, title, qnaType, createdAt, user: { imgUrl, name },
    },
  } = props;
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className={styles.questionItem}>
      <div className={styles.questionItem__content}>
        <div className={styles.questionItem__answers}>
          <span className={styles.questionItem__answerCount}>{comments}</span>
          <span className={styles.questionItem__answerCountLabel}>Answers</span>
        </div>
        <div className={styles.questionItem__article}>
          <div>
            {tags.map((tag) => <Tag key={tag}><a href={`/tags/${tag}`}>{tag}</a></Tag>)}
          </div>
          <h1 className={styles.questionItem__title}><a href={title}>{title}</a></h1>
          <span className={styles.questionItem__category}>
            [
            {' '}
            {qnaType}
            {' '}
            ]
          </span>
        </div>
        <div className={styles.questionItem__user}>
          <div className={styles.questionItem__profile}>
            <img className={styles.questionItem__profileImage} src={imgUrl} alt={name} />
            <span className={styles.questionItem__level}>WHITE</span>
          </div>
          <span className={styles.questionItem__username}>{name}</span>
          <span className={styles.questionItem__date}>{createdAt}</span>
        </div>
      </div>
      <div className={styles.questionItem__actions}>
        <ActionButton className={liked ? 'active' : undefined} onClick={() => setLiked(!liked)}>
          <ThumbsUpIcon />
          <span className={styles.actionButton__thumbsUpCount}>0</span>
        </ActionButton>

        <ActionButton className={bookmarked ? 'active' : undefined} onClick={() => setBookmarked(!bookmarked)}>
          <BookmarkIcon />
        </ActionButton>
      </div>
    </div>
  );
};
export default QuestionItem;
