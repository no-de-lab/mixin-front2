import React from 'react';
import Head from 'next/head';
import DeveloperCardLayout from '../comopnents/developerCard';

const Home = () => (
  <>
    <Head>
      <title>Mix in | 홈</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>홈</div>
    <DeveloperCardLayout />
  </>
);

export default Home;
