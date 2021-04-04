import React from 'react';
import Head from 'next/head';
import { handleAsync } from '@/utils/mobx';
import { Article } from '@/utils/api';
import ArticleList from '@/components/ArticleList';

const Home = () => (
  <div>
    <Head>
      <title>Mix in | 홈</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ArticleList />
  </div>
);

export async function getServerSideProps() {
  // call api
  const [res] = await handleAsync(Article.all());

  return { props: { initialState: { articleStore: { articles: res.data.articles || [] } } } };
}

export default Home;
