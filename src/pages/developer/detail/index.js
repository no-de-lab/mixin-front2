import React from 'react';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';
// import { useCookie } from 'next-cookie';
import ProfileLayout from '@/layout/profile';
import { useRouter } from 'next/router';
import {
  Answers, Qeustions,
} from '@/layout/profile/body';
import { useStore } from '../../../modules';

const DeveloperDetail = () => {
  const { developerStore } = useStore();
  const { developer } = developerStore;
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
export async function getServerSideProps() {
  // const { slug } = ctx.query;
  // switch (page) {
  //   default:
  //     return { props: { page } };
  // }
  return { props: { } };
}
export default observer(DeveloperDetail);
