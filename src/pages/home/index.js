import React from 'react';
import Head from 'next/head';
import { useCookie } from 'next-cookie';
import qs from 'qs';
import axios from 'axios';
import HomeLayout from '@/layout/crawling/HomeLayout';

const Home = () => (
  <>
    <Head>
      <title>Mix in | 홈</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HomeLayout />
  </>
);

// SSR 페이지를 그리기 전에 Mix-in api 서버에서 받아와야 하는 정보들
// Nextjs 페이지를 만들기 전에 실행되는 함수
export async function getServerSideProps(ctx) {
  const cookie = useCookie(ctx);
  const token = cookie.get('userInfo') || '';
  const {
    search, size, page, sort,
  } = ctx.query;
  // call api
  const articlesUrl = token ? 'api/v2/articles/me' : 'api/v2/articles';
  const queryString = qs.stringify({
    page: page || 1,
    size: size || 30,
    search: search || undefined,
    sort: sort || 'created_at',
  });
  const axiosRequest = {
    method: 'get',
    headers: { Authorization: token },
  };
  axiosRequest.url = `${process.env.NEXT_PUBLIC_SERVER_URL}/${articlesUrl}?${queryString}`;
  const { data } = await axios(axiosRequest);
  // console.log(data, 'from search');
  // 프론트 서버 안에서
  // 페이지 그리기 전에 Mobx Store 여기서 초기화
  // return된 값은 pages/_app.js의 Props로 전달
  return { props: { initialState: { articleStore: { articles: [] || [] } } } };

  // Hydrate 프론트 서버의 Mobx Store 클라이언트 가지고 있는 Mobx Store랑 일치를 시켜줘야 함
}

export default Home;
