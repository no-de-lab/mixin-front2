import React, { useCallback, useState } from 'react';
import Modal from '@/components/Modal';
import { BackIcon, MenuIcon } from '@/svg';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { SubbarProfile } from '@/components/Header';
import Login from '@/components/Auth/Login';
import { useStore } from '../../../modules';
import CommentListLayout from './CommentListLayout';
import PostContent from './PostContent';
import styles from './PostLayout.module.scss';

const PostLayout = observer(({ post }) => {
  const { authStore } = useStore();
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
        <Modal
          position="right"
          visible={visible}
          setVisible={setVisible}
          render={
              authStore.loaded
                ? <SubbarProfile authStore={authStore} setVisible={toggleMenu} />
                : <Login />
            }
        />
      </div>
    </main>
  );
});

export default PostLayout;
