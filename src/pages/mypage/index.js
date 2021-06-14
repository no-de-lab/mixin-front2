import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useCookie } from 'next-cookie';
import ProfileLayout from '@/layout/profile';
import { useRouter } from 'next/router';
import {
  Profile, Answers, Bookmark, Qeustions,
} from '@/layout/profile/body';
import { useStore } from '../../modules';

const Mypage = (props) => {
  const { authStore } = useStore();
  const router = useRouter();
  const { page } = router.query;
  const renderBody = (page) => {
    switch (page) {
      case 'profile':
        return <Profile />;
      case 'questions':
        return <Qeustions />;
      case 'answers':
        return <Answers />;
      case 'bookmark':
        return <Bookmark {...props.data} />;
      default:
        return <p>Not Found</p>;
    }
  };
  return (
    <>
      <Head>
        <title>
          {/* {`Mix in | Mypage - ${page}`} */}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileLayout user={authStore.user} from="mypage">
        {renderBody(page)}
      </ProfileLayout>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const cookie = useCookie(ctx);
  const token = cookie.get('userInfo') || '';
  const { page } = ctx.query;
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }
  const axiosRequest = {
    method: 'get',
    headers: { Authorization: token },
  };
  switch (page) {
    case 'bookmark': {
      const size = 30;
      const sort = 'created_at';
      axiosRequest.url = `${process.env.NEXT_PUBLIC_SERVER_URL}api/v2/articles/bookmarked?size=${size}&sort=${sort}`;
      const { data } = await axios(axiosRequest);
      return { props: { page, data } };
    }
    case undefined:
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
        props: {},
      };
    default:
      return { props: { page } };
  }
}
export default observer(Mypage);
