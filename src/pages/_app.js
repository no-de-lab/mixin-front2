import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider } from 'mobx-react';

import '../utils/styles/global.scss';
import Header from '@/components/Header';
import LeftSideBar from '@/components/LeftSideBar';
import RightSideBar from '@/components/RightSideBar';
import Footer from '@/components/Footer';
import { useStore } from '../modules';

const App = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialState);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
        />
        <title>Mix in</title>
      </Head>
      <Provider store={store}>
        <Header />
        <main className="container flex flex-row">
          <LeftSideBar />
          <Component {...pageProps} />
          <RightSideBar />
        </main>
        <Footer />
      </Provider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
