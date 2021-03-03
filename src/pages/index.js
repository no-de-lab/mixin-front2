import React from 'react';
import Head from 'next/head';
import DeveloperPageLayout from '@/layout/developer';

const Home = () => (
  <>
    <Head>
      <title>Mix in | 홈</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div style={{ margin: '200px' }}>
      <DeveloperPageLayout />
    </div>
  </>
);

export default Home;
