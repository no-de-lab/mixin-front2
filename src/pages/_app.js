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
import axios from 'axios';
import { useStore } from '../modules';
import { useCookie } from 'next-cookie'

const App = ({ Component, appProps, pageProps}) => {
  const store = useStore({ ...appProps.initialState });
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

App.getInitialProps = async (appContext) => {
  const cookie = useCookie(appContext.ctx);
  const token = cookie.get('userInfo') || '';
  const initialState = { authStore: { user: [], loaded: false } };
  
  if(!token) return { appProps: { initialState } };
  
  try {
    const auth = await axios({
      method: 'post',
      url: process.env.NEXT_PUBLIC_SERVER_URL + '/api/user/me',
      headers: {
        Authorization : token
      }
    });
    return { appProps: { initialState: { authStore: {loaded: true, user: auth.data} } } }
  } catch (e) {
    return { appProps: { initialState } };
  }
}

export default App;
