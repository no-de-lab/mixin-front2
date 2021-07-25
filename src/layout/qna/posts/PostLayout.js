import React from 'react';
import CommentListLayout from './CommentListLayout';
import PostContent from './PostContent';
import styles from './PostLayout.module.scss';

const PostLayout = ({ post }) => (
  <main className="flex flex-row h-full">
    <div className={styles.post__container}>
      <PostContent post={post} />
      <CommentListLayout comments={post?.commentList} />
    </div>
  </main>
);

export default PostLayout;
