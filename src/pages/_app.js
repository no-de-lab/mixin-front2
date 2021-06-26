import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import axios from 'axios';
import { Provider } from 'mobx-react';
import { useCookie } from 'next-cookie';
import Header from '@/components/Header';
import LeftSideBar from '@/components/LeftSideBar';
import RightSideBar from '@/components/RightSideBar';
import ROUTE from '@/utils/constant/route';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import { CloseIcon } from '@/svg';
import { useRouter } from 'next/router';
import { useStore } from '../modules';

import '../utils/styles/Toast.scss';
import '../utils/styles/global.scss';
import 'codemirror/lib/codemirror.css';
import '../utils/styles/toastui-editor.css';

const App = ({ Component, appProps, pageProps }) => {
  const { pathname } = useRouter();
  const store = useStore({ ...appProps.initialState });
  const exceptLayout = [`/${ROUTE.EDITOR}`];

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
        {!exceptLayout.includes(`${pathname}`)
          ? (
            <>
              <Header />
              <main className="flex flex-row">
                <LeftSideBar />
                <Component {...pageProps} />
                <RightSideBar />
              </main>
              <Footer />
            </>
          ) : <Component {...pageProps} />}
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
  if (!token) return { appProps: { initialState } };
  try {
    const auth = await axios({
      method: 'post',
      url: process.env.NEXT_PUBLIC_SERVER_URL + '/api/user/me',
      headers: {
        Authorization: token,
      },
    });
    return { appProps: { initialState: { authStore: { loaded: true, user: auth.data } } } };
  } catch (e) {
    return { appProps: { initialState } };
  }
};
export default App;
