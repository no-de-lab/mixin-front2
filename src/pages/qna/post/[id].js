import React, { useEffect } from 'react';
import Head from 'next/head';
import { useCookie } from 'next-cookie';
import PostLayout from '@/layout/qna/posts/PostLayout';
import CONFIG from '@/utils/config/AppConfig';
import axios from 'axios';

const PostPage = (props) => {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mode = JSON.parse(localStorage.getItem('theme')) || CONFIG.DEFAULT_THEME;
      const bodyEl = document.querySelector('body');
      bodyEl.classList.remove(mode === 'light' ? 'dark' : 'light');
      bodyEl.classList.add(mode);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Mix in | Posts</title>
      </Head>
      <PostLayout post={props?.pageProps?.post} />
    </>
  );
};

// SSR 페이지를 그리기 전에 Mix-in api 서버에서 받아와야 하는 정보들
// Nextjs 페이지를 만들기 전에 실행되는 함수
export async function getServerSideProps(ctx) {
  // call api
  const cookie = useCookie(ctx);

  const { id } = ctx.query;
  console.log('posts id', id);

  const token = cookie.get('userInfo') || '';

  try {
    const post = await axios({
      method: 'get',
      url: process.env.NEXT_PUBLIC_SERVER_URL + `/api/v1/qna/${id}`,
      headers: {
        Authorization: token,
      },
    });

    if(post) {
      return { props: { pageProps: { post: post.data }} };
    }
  } catch (e) {
    console.log('error', e);
    return {
      redirect: {
        permanent: false,
        destination: '/qna',
      },
      props: {},
    };
  }
}

export default PostPage;
