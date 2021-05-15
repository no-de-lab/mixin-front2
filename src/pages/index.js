import React from 'react';
import Head from 'next/head';
import HomeLayout from '@/layout/crawling/HomeLayout';

const Home = () => (
  <>
    <Head>
      <title>Mix in | 홈</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HomeLayout />
  </>
);

export default Home;
