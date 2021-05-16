import React from 'react';
import Head from 'next/head';
import HomeLayout from '@/layout/crawling/HomeLayout';

const Home = () => (
  <div>
    <Head>
      <title>Mix in | 홈</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HomeLayout />
  </div>
);

// SSR 페이지를 그리기 전에 Mix-in api 서버에서 받아와야 하는 정보들
// Nextjs 페이지를 만들기 전에 실행되는 함수
export async function getServerSideProps() {
  // call api
  // const [res] = await handleAsync(Article.all());

  // 프론트 서버 안에서
  // 페이지 그리기 전에 Mobx Store 여기서 초기화
  // return된 값은 pages/_app.js의 Props로 전달
  return { props: { initialState: { articleStore: { articles: [] || [] } } } };

  // Hydrate 프론트 서버의 Mobx Store 클라이언트 가지고 있는 Mobx Store랑 일치를 시켜줘야 함
}

export default Home;
