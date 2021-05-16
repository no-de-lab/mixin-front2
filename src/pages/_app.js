import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider } from 'mobx-react';

import '../utils/styles/Toast.scss';
import '../utils/styles/global.scss';
import Header from '@/components/Header';
import LeftSideBar from '@/components/LeftSideBar';
import RightSideBar from '@/components/RightSideBar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import { CloseIcon } from '@/svg';
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
      {/* SSR에서 만든 애를 Hydrate 해서 클라이언트 브라우저에다가 동기화 */}
      <Provider store={store}>
        <Header />
        <main className="flex flex-row">
          <LeftSideBar />
          <Component {...pageProps} />
          <RightSideBar />
        </main>
        <Footer />
        <ToastContainer closeButton={<CloseIcon />} />
      </Provider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
