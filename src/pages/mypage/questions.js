import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProfileLayout from '@/layout/profile';

const Questions = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Mix in | profile - questions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileLayout>
        questions
      </ProfileLayout>
    </>
  );
};

export default Questions;
