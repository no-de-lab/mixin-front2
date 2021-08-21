import DropLeft from '@/components/DropLeft';
import { BackIcon, MenuIcon } from '@/svg';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import CommentListLayout from './CommentListLayout';
import PostContent from './PostContent';
import styles from './PostLayout.module.scss';

const PostLayout = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const onBack = useCallback(() => {
    router.back();
  }, []);

  const toggleMenu = useCallback(() => {
    setVisible(!visible);
  }, [visible, setVisible]);

  console.log('post', post);

  return (
    <main className="flex flex-row h-full">
      <div className={styles.post__container}>
        <div className={styles.post__back}>
          <BackIcon onClick={onBack} />
        </div>
        <div className={styles.post__submenu}>
          <MenuIcon handleClick={toggleMenu} />
        </div>
        <PostContent post={post} />
        <CommentListLayout postId={post.id} comments={post?.commentList} />
        <DropLeft
          position="right"
          visible={visible}
          setVisible={setVisible}
        />
      </div>
    </main>
  );
};

export default PostLayout;
