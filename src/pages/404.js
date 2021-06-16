import React from 'react';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Mix in | Not Found</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen text-center flex flex-col justify-center" style={{ fontFamily: "'Blender Pro', sans-serif" }}>
        <h1 className="text-9xl">404</h1>
        <h1 className="text-4xl">Page Not Found</h1>
      </div>
    </>
  );
}
