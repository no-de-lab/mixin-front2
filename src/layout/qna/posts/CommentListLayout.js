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

const dummyComment = [
  {
    id: 'string',
    createdAt: '2021-07-25T04:23:05.403Z',
    updatedAt: '2021-07-25T04:23:05.403Z',
    comment: 'string',
    likes: 0,
    liked: true,
    user: {
      id: 0,
      email: 'string',
      name: 'string',
      imgUrl: 'string',
      createdAt: '2021-07-25T04:23:05.403Z',
      updatedAt: '2021-07-25T04:23:05.403Z',
      userLevel: 'WHITE',
    },
  }, {
    id: 'string',
    createdAt: '2021-07-25T04:23:05.403Z',
    updatedAt: '2021-07-25T04:23:05.403Z',
    comment: 'string',
    likes: 0,
    liked: true,
    user: {
      id: 0,
      email: 'string',
      name: 'string',
      imgUrl: 'string',
      createdAt: '2021-07-25T04:23:05.403Z',
      updatedAt: '2021-07-25T04:23:05.403Z',
      userLevel: 'WHITE',
    },
  },
];

const CommentListLayout = observer(({ comments }) => {
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
    };

    const [res, err] = await handleAsync(Qna.comment({ registerData }));
    if (res) {
      setCurComments([...curComments, res?.data]);
      resetComment();
    } else {
      console.log(err);
    }
  }, [comment, setComment, curComments, setCurComments, resetComment]);

  const deleteComment = useCallback(async (commentId) => {
    const [res, err] = await handleAsync(Qna.deleteComment({ commentId }));
    if (res) {
      const filteredComments = curComments.filter((comment) => comment.id !== commentId);
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
        {dummyComment.length > 0 && dummyComment.map((item) => (
          <CommentContent comment={item} deleteComment={deleteComment} />))}
      </div>
    </>
  );
});

export default CommentListLayout;
