import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useCookie } from 'next-cookie';
import ProfileLayout from '@/layout/profile';
import { useStore } from '../../modules';
import {Profile, Answers, Bookmark, Qeustions} from './body';

const Mypage = (props) => {
  console.log(props)
  const { authStore } = useStore();
  const renderBody = ({page}) => {
    switch (page) {
      case "profile":
        return <Profile />
      case "questions":
        return <Qeustions />
      case "answers":
        return <Answers />
      case "bookmark":
        return <Bookmark {...props.data}/>
      default:
        return <p>Not Found</p>
    }
  }
  return (
    <>
      <Head>
        <title>Mix in | Mypage - {props.page}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileLayout user={authStore.user}>
        {renderBody(props)}
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
    headers: { Authorization : token }
  }
  switch (page) {
    case "bookmark": {
      const size = 30;
      const sort =  "created_at";
      axiosRequest.url = process.env.NEXT_PUBLIC_SERVER_URL + `api/v2/articles/bookmarked?size=${size}&sort=${sort}`
      const {data} = await axios(axiosRequest);
      return { props: { page, data } };
    }
    default:
      return { props: { page } };
  }
  
}
export default observer(Mypage);
