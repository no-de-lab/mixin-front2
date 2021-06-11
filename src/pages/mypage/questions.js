import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProfileLayout from '@/layout/profile';
import { useStore } from '../../modules';
import { observer } from 'mobx-react-lite';

const Questions = () => {
  const router = useRouter();
  const { authStore } = useStore();
  return (
    <>
      <Head>
        <title>Mix in | profile - questions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileLayout user={authStore.user}>
        questions
      </ProfileLayout>
    </>
  );
};

export default observer(Questions);
