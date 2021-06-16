import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useCookie } from 'next-cookie';
import ProfileLayout from '@/layout/profile';
import { useRouter } from 'next/router';
import {
  Answers, Qeustions,
} from '@/layout/profile/body';

const DeveloperDetail = (props) => {
  const { developer } = props;
  const router = useRouter();
  const { page } = router.query;
  const renderBody = (page) => {
    switch (page) {
      case 'questions':
        return <Qeustions />;
      case 'answers':
        return <Answers />;
      default:
        return <p>Not Found</p>;
    }
  };
  return (
    <>
      <Head>
        <title>
          {`Mix in | Developer - ${developer.name}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProfileLayout user={developer} from="detail">
        {renderBody(page)}
      </ProfileLayout>
    </>
  );
};
export async function getServerSideProps(ctx) {
  const cookie = useCookie(ctx);
  const token = cookie.get('userInfo') || '';
  const { user } = ctx.query;
  const axiosRequest = {
    method: 'get',
    headers: { Authorization: token },
  };
  axiosRequest.url = `${process.env.NEXT_PUBLIC_SERVER_URL}api/user/${user}`;
  const { data } = await axios(axiosRequest);
  return { props: { developer: data } };
}
export default observer(DeveloperDetail);
