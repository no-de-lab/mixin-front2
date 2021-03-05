import React from 'react';
import Head from 'next/head';
import QnaListLayout from '@/layout/qna/list';
import QuestionItem from '@/components/QuestionItem';
import ThemeSwitch from '@/components/ThemeSwitch';

const dummyData = [
  {
    answers: 2,
    tags: ['ec2', 'war', 'spring', 'tomcat'],
    title: 'Lorem ipsum dolor sit amet',
    category: 'WEB',
    href: 'https://google.com/123',
    date: '2020.12.03',
    author: {
      profileImageUrl: 'https://randomuser.me/api/portraits/med/men/1.jpg',
      username: 'usernameA'
    },
  },
  {
    answers: 2,
    tags: ['ec2', 'war', 'spring', 'tomcat', 'lorem', 'ipsum', 'dolor'],
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat mauris nunc',
    href: 'https://google.com',
    category: 'App',
    date: '2020.12.03',
    author: {
      profileImageUrl: 'https://randomuser.me/api/portraits/med/men/1.jpg',
      username: 'usernameA'
    },
  },
];


const QnaPage = () => (
  <QnaListLayout>
    <Head>
      <title>Mix in | Q&A</title>
    </Head>
    {dummyData.map((data) => <QuestionItem key={data.href} question={data} />)}
  </QnaListLayout>
);

export default QnaPage;
