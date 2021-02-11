import React from 'react';
import Head from 'next/head';
import ThemeSwitch from '@/components/ThemeSwitch';

const Home = () => (
  <>
    <Head>
      <title>Mix in | 홈</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>홈</div>
    <ThemeSwitch />
  </>
);

export default Home;
