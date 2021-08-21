import React, { useCallback, useEffect, useState } from 'react';
import { handleAsync } from '@/utils/mobx';
import { Qna } from '@/utils/api';
import Toast from '@/components/Toast';
import useInput from '@/utils/hooks/useInput';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../modules';
import styles from './CommentListLayout.module.scss';
import CommentContent from './CommentContent';
import CommentEditor from './CommentEditor';

const CommentListLayout = observer(({ comments, postId }) => {
  const { authStore } = useStore();
  const [curComments, setCurComments] = useState();
  const [comment, setComment, resetComment] = useInput('');

  const addComment = useCallback(async () => {
    if (!authStore.user?.id) {
      Toast.notify('로그인 후 이용해주세요.');
      return;
    }

    if (comment.length < 1) {
      return;
    }

    const registerData = {
      comment,
      qnaId: postId,
    };

    const [res, err] = await handleAsync(Qna.comment(registerData));
    if (res) {
      console.log('res', res);
      setCurComments([...curComments]);
      resetComment();
    } else {
      console.log(err);
    }
  }, [comment, setComment, curComments, setCurComments, resetComment]);

  const deleteComment = useCallback((commentId) => async () => {
    const [res, err] = await handleAsync(Qna.deleteComment({ commentId }));
    if (res) {
      const filteredComments = curComments?.filter((comment) => comment.id !== commentId);
      setCurComments(filteredComments);
    } else {
      console.log(err);
    }
  }, [curComments, setCurComments]);

  useEffect(() => {
    setCurComments(comments);
  }, [comments]);

  return (
    <>
      <CommentEditor comment={comment} setComment={setComment} addComment={addComment} />
      <div className={styles.comment_list__container}>
        {curComments?.length > 0 && curComments?.map((item) => (
          <CommentContent comment={item} deleteComment={deleteComment} />))}
      </div>
    </>
  );
});

export default CommentListLayout;
