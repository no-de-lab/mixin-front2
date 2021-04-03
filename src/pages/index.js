import React from 'react';
import Head from 'next/head';

const Home = (props) => {
  console.log('props', props);
  return (
    <>
      <Head>
        <title>Mix in | 홈</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>홈</div>
    </>
  );
};

export function getServerSideProps() {
  return { props: { initialState: { counterStore: 3 } } };
}

export default Home;
