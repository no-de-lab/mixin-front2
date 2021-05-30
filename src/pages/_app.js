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
import { handleAsync } from '@/utils/mobx';
import { Auth } from '@/utils/api';
import axios from 'axios';
import { useStore } from '../modules';

const App = ({ Component, appProps, pageProps }) => {
  const store = useStore({ ...appProps.initialState, ...pageProps.initialState });

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

App.getInitialProps = async (context) => {
  const { ctx } = context; // next에서 넣어주는 context
  const isServer = !!ctx;

  const cookie = isServer ? ctx.req.headers.cookie : '';

  if (isServer && cookie) {
    let cookieArray = cookie.split(';');
    if (cookieArray.length > 0) {
      cookieArray = cookieArray.map((cookie) => cookie.trim());

      if (isServer && cookie) {
        // 서버 환경일 때만 쿠키를 심어줌. 클라이언트 환경일 때는 브라우저가 자동으로 쿠키를 넣어줌
        axios.defaults.headers.Cookie = cookie;
        // defaluts: 모든 axios 요청 시에 쿠키 데이터를 심어줌.
      }

      const index = cookieArray.findIndex((cookie) => cookie.startsWith('userInfo=Bearer%20'));
      if (index > -1) {
        const authCookie = cookieArray[index].slice('userInfo='.length);
        axios.defaults.headers.Authorization = authCookie.replace('%20', ' ');
        const [auth] = await handleAsync(Auth.info());
        if (auth.data) {
          return { appProps: { initialState: { authStore: { user: auth.data, loaded: true } } } };
        }
      }
    }
  }

  return { appProps: { initialState: { authStore: { user: [], loaded: false } } } };
};

export default App;
