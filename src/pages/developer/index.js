import Head from 'next/head';
import React from 'react';
import DeveloperLayout from '@/layout/developer';

const Developer = () => (
  <>
    <Head>
      <title>Mix in | my page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div style={{ margin: '160px auto' }}>
      <DeveloperLayout />
    </div>
  </>
);

export default Developer;
