import ROUTE from '@/utils/constant/route';
import React from 'react';

const Main = () => (
  <>
    <div>Home으로 리다이렉트</div>
  </>
);

export async function getServerSideProps(context) {
  // or use context.resolvedUrl for conditional redirect
  if (context.resolvedUrl === '/') {
    return {
      redirect: {
        destination: `/${ROUTE.CRAWLING}`,
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
export default Main;
