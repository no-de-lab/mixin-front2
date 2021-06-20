import QuestionItem from '@/components/QuestionItem';
import { Spinner } from '@/components/Spinner';
import { Qna } from '@/utils/api';
import useInfiniteScroll from '@/utils/hooks/useInfiniteScroll';
import React, { useState } from 'react';
import { useStore } from '../../modules';
import styles from './QnaLayout.module.scss';

const QnaLayout = () => {
  const { authStore } = useStore();
  const [loading, setLoading] = useState(false);
  const [issues] = useInfiniteScroll(authStore.user?.id
    ? Qna.authAll : Qna.all, loading, setLoading);

  console.log('issues', issues);

  return (
    <div className={styles.qnaList__container}>
      {issues.length > 0 && issues.map((data) => <QuestionItem key={data?.id} question={data} />)}
      {loading && <div><Spinner /></div>}
    </div>
  );
};

export default QnaLayout;
