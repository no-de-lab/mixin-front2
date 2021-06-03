import QuestionItem from '@/components/QuestionItem';
import { Spinner } from '@/components/Spinner';
import { Qna } from '@/utils/api';
import useInfiniteScroll from '@/utils/hooks/useInfiniteScroll';
import React, { useState } from 'react';
import { useStore } from '../../modules';
import styles from './QnaLayout.module.scss';

const dummyList = [
  {
    id: 'string1',
    createdAt: '2021-06-03T10:23:51.243Z',
    updatedAt: '2021-06-03T10:23:51.243Z',
    title: 'string',
    content: 'string',
    qnaType: 'string',
    tags: [
      'string',
      'string',
      'string',
      'string',
      'string',
    ],
    bookmarks: 0,
    bookmarked: true,
    likes: 0,
    liked: true,
    comments: 0,
    user: {
      id: 0,
      email: 'string',
      name: 'string',
      imgUrl: 'string',
      createdAt: '2021-06-03T10:23:51.243Z',
      updatedAt: '2021-06-03T10:23:51.243Z',
      userLevel: 'WHITE',
    },
    commentList: [
      {
        id: 'string',
        createdAt: '2021-06-03T10:23:51.243Z',
        updatedAt: '2021-06-03T10:23:51.244Z',
        comment: 'string',
        likes: 0,
        liked: true,
        user: {
          id: 0,
          email: 'string',
          name: 'string',
          imgUrl: 'https://randomuser.me/api/portraits/med/men/1.jpg',
          createdAt: '2021-06-03T10:23:51.244Z',
          updatedAt: '2021-06-03T10:23:51.244Z',
          userLevel: 'WHITE',
        },
      },
    ],
  },
  {
    id: 'string2',
    createdAt: '2021-06-03T10:23:51.243Z',
    updatedAt: '2021-06-03T10:23:51.243Z',
    title: 'string',
    content: 'string',
    qnaType: 'string',
    tags: [
      'string',
      'string',
      'string',
      'string',
      'string',
    ],
    bookmarks: 0,
    bookmarked: true,
    likes: 0,
    liked: true,
    comments: 0,
    user: {
      id: 0,
      email: 'string',
      name: 'string',
      imgUrl: 'https://randomuser.me/api/portraits/med/men/1.jpg',
      createdAt: '2021-06-03T10:23:51.243Z',
      updatedAt: '2021-06-03T10:23:51.243Z',
      userLevel: 'WHITE',
    },
    commentList: [
      {
        id: 'string',
        createdAt: '2021-06-03T10:23:51.243Z',
        updatedAt: '2021-06-03T10:23:51.244Z',
        comment: 'string',
        likes: 0,
        liked: true,
        user: {
          id: 0,
          email: 'string',
          name: 'string',
          imgUrl: 'string',
          createdAt: '2021-06-03T10:23:51.244Z',
          updatedAt: '2021-06-03T10:23:51.244Z',
          userLevel: 'WHITE',
        },
      },
    ],
  },
];

const QnaLayout = () => {
  const { authStore } = useStore();
  const [loading, setLoading] = useState(false);
  // const [issues] = useInfiniteScroll(authStore.user?.id
  //   ? Qna.authAll : Qna.all, loading, setLoading);

  // console.log('issues', issues);

  return (
    <div className={styles.qnaList__container}>
      {dummyList.map((data) => <QuestionItem key={data.id} question={data} />)}
      {loading && <div><Spinner /></div>}
    </div>
  );
};

export default QnaLayout;
