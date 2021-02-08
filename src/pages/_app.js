import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import '../utils/styles/global.scss';
import CONFIG from '@/config/AppConfig';

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
    <div className="bg-blue-500 text-gray-200">{CONFIG.DEFAULT_THEME}</div>
    <Component {...pageProps} />
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
