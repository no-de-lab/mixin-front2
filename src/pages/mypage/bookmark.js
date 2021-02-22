import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProfileLayout from '../../layout/profile';

const Bookmark = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Mix in | profile - bookmark</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileLayout>
        bookmark
      </ProfileLayout>
    </>
  );
};

export default Bookmark;
