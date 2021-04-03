import React from 'react';
import Head from 'next/head';
import Counter from '@/components/Counter';

const Home = () => (
  <div>
    <Head>
      <title>Mix in | 홈</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Counter />
  </div>
);

export function getServerSideProps() {
  // 1. auth
  return { props: { initialState: { counterStore: { count: 3 } } } };
}

export default Home;
