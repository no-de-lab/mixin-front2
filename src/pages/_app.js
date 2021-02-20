import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import '../utils/styles/global.scss';
import Header from '@/components/Header';

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
    <Component {...pageProps} />
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
