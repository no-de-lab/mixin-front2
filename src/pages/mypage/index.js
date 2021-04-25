import React, { useState } from 'react';
import Head from 'next/head';
import ProfileLayout from '@/layout/profile';
import styles from './index.module.scss';

/*
  TODO: Profile Edit page
    - connect mobx
    -

*/
const FormButton = (props) => {
  const { children } = props;
  return (
    <button className={styles.form__botton} type="button">{children}</button>
  );
};

const ProfileForm = (props) => {
  // TODO: use mobx for update profile update
  const { children } = props;
  return (
    <div className={styles.mypage__form}>
      {children}
    </div>
  );
};

const ProfileInput = (props) => {
  const {
    value, label, name, placeHolder,
  } = props;
  const [content, setContent] = useState(value || '');
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <div className={styles.mypage__form_input}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} autoComplete="off" placeholder={placeHolder} value={content} onChange={handleChange} />
    </div>

  );
};

const Mypage = () => (
  <>
    <Head>
      <title>Mix in | my page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ProfileLayout>
      <ProfileForm>
        <ProfileInput name="nickname" label="nickname" placeHolder="믹스인에서 사용할 닉네임을 입력해주세요." />
        <ProfileInput name="job" label="job" placeHolder="본인이 주로 작업하는 분야를 선택해주세요" />
        <ProfileInput name="url" label="url" placeHolder="url을 넣어주세요." />
        <ProfileInput name="about" label="about us" placeHolder="자신을 짧게 소개해주세요." />
        <FormButton>complete</FormButton>
      </ProfileForm>
    </ProfileLayout>
  </>
);

export default Mypage;
