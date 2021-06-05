import DeveloperCard from '@/components/developerCard/DeveloperCard';
import Tag from '@/components/Tag';
import dayjs from 'dayjs';
import React from 'react';
import styles from './PostLayout.module.scss';

const PostContent = ({ post }) => {
  const {
    tags, title, content, createdAt, updatedAt, user,
  } = post;

  return (
    <div className={styles.content__container}>
      <h1>{title}</h1>
      <span />
      <div>{tags.map((tag) => <Tag key={tag}><a href={`/tags/${tag}`}>{tag}</a></Tag>)}</div>
      <div>
        {content}
      </div>
      <div>
        <span>최근 작성일</span>
        <span>{dayjs(createdAt).format('YYYY.MM.DD')}</span>
      </div>
      <div>
        <span>최근 수정일</span>
        <span>{dayjs(updatedAt).format('YYYY.MM.DD')}</span>
      </div>
      <DeveloperCard developer={user} />
    </div>
  );
};

export default PostContent;
