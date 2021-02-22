import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ThemeSwitch from '@/components/ThemeSwitch';
const Home = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Mix in | 홈</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>홈
        <a onClick={() => router.push('/mypage')}>Profile</a>
      </div>
      <ThemeSwitch />
    </>
  )
};

export default Home;
