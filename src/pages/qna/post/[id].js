import React from 'react';
import Head from 'next/head';
import { Qna } from '@/utils/api';
import { useCookie } from 'next-cookie';
import { handleAsync } from '@/utils/mobx';
import PostLayout from '@/layout/qna/posts/PostLayout';

const PostPage = (props) => {
  console.log('posts props', props);
  return (
    <>
      <Head>
        <title>Mix in | Posts</title>
      </Head>
      <PostLayout />
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

  // const [res, error] = await handleAsync(token ? Qna.authOne({ qnaId: id }) : Qna.one({ qnaId: id }));

  // if (res) {
  //   console.log('res', res);
  // }

  // if (error) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/qna',
  //     },
  //     props: {},
  //   };
  // }

  return { props: { } };
}

export default PostPage;
