import React from 'react';
import Head from 'next/head';
import ProfileLayout from '@/layout/profile';
import { useStore } from '../../modules';
import { observer } from 'mobx-react-lite';

const Bookmark = () => {
  const { authStore } = useStore();
  return (
    <>
      <Head>
        <title>Mix in | profile - bookmark</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileLayout user={authStore.user}>
        bookmark
      </ProfileLayout>
    </>
  );
};

export default observer(Bookmark);
