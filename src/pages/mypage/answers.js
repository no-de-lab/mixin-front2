import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProfileLayout from '@/layout/profile';
import { useStore } from '../../modules';
import { observer } from 'mobx-react-lite';

const Answers = () => {
  // const router = useRouter();
  const { authStore } = useStore();
  return (
    <>
      <Head>
        <title>Mix in | profile - answers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileLayout user={authStore.user}>
        answers
      </ProfileLayout>
    </>
  );
};

export default observer(Answers);
