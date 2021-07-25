import DeveloperCard from '@/components/developerCard/DeveloperCard';
import Tag from '@/components/Tag';
import dayjs from 'dayjs';
import React, { forwardRef, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './PostContent.module.scss';

const Viewer = dynamic(() => import('./WrappedViewer'), { ssr: false });
const ViewerWithForwardedRef = forwardRef((props, ref) => (
  <Viewer {...props} forwardedRef={ref} />
));

const PostContent = ({ post }) => {
  console.log(post);
  const {
    tags, title, content, qnaType, createdAt, updatedAt, user,
  } = post;

  const viewerRef = useRef();

  return (
    <div className={styles.content__container}>
      <h1 className={styles.post_header}>{title}</h1>
      <span className={styles.post_category}>{qnaType && `[${qnaType}]`}</span>
      <div className={styles.post_tag}>{tags.map((tag) => <Tag key={tag}><a href={`/tags/${tag}`}>{tag}</a></Tag>)}</div>
      <div className={styles.post_content}>
        <ViewerWithForwardedRef
          initialValue={content || ''}
        />
      </div>
      <div className={styles.post_date}>
        <span>최근 작성일</span>
        <span>{dayjs(createdAt).format('YYYY.MM.DD')}</span>
      </div>
      {updatedAt && (
      <div className={styles.post_date}>
        <span>최근 수정일</span>
        <span>{dayjs(updatedAt).format('YYYY.MM.DD')}</span>
      </div>
      )}
      {user && <DeveloperCard developer={user} />}
    </div>
  );
};

export default PostContent;
