import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProfileLayout from '../../layout/profile'

const Answers = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Mix in | profile - answers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileLayout>
        answers
      </ProfileLayout>
    </>
  )
};

export default Answers;
