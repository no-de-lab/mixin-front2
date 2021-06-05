import React from 'react';
import PostContent from './PostContent';
import styles from './PostLayout.module.scss';

const dummyData = {
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
  bookmarked: false,
  likes: 0,
  liked: false,
  comments: 2,
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
      comment: '2',
      likes: 0,
      liked: false,
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
};

const PostLayout = () => (
  <div className={styles.post__container}>
    <PostContent post={dummyData} />
  </div>
);

export default PostLayout;
