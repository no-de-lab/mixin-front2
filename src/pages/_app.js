import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import '../utils/styles/global.scss';
import Header from '@/components/Header';
import LeftSideBar from '@/components/LeftSideBar';
import RightSideBar from '@/components/RightSideBar';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
      />
      <title>Mix in</title>
    </Head>
    <Header />
    <main className="container flex flex-row">
      <LeftSideBar />
      <Component {...pageProps} />
      <RightSideBar />
    </main>
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
