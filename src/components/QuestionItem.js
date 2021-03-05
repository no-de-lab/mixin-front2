import React from 'react';
import Tag from './Tag';
import styles from './QuestionItem.module.scss';

const QuestionItem = (props) => {
  const { question: { answers, tags, title, href, category, date, author: { profileImageUrl, username } }} = props;

  return (
    <div className={styles.questionItem}>
      <div className={styles.questionItem__answers}>
        <span className={styles.questionItem__answerCount}>{answers}</span>
        <span className={styles.questionItem__answerCountLabel}>Answers</span>
      </div>
      <div className={styles.questionItem__article}>
        <div>
          {tags.map((tag) => <Tag key={tag}><a href={`/tags/${tag}`}>{tag}</a></Tag>)}
        </div>
        <h1 className={styles.questionItem__title}><a href={href}>{title}</a></h1>
        <span className={styles.questionItem__category}>
          [
          {' '}
          {category}
          {' '}
          ]
        </span>
      </div>
      <div className={styles.questionItem__user}>
        <div className={styles.questionItem__profile}>
          <img className={styles.questionItem__profileImage} src={profileImageUrl} alt={username} />
          <span className={styles.questionItem__level}>WHITE</span>
        </div>
        <span className={styles.questionItem__username}>{username}</span>
        <span className={styles.questionItem__date}>{date}</span>
      </div>
    </div>
  );
};
export default QuestionItem;
