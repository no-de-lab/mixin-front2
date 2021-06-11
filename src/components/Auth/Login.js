import React from 'react';
import PropTypes from 'prop-types';
import GoogleLoginButton from './GoogleLoginButton';
import { observer } from "mobx-react-lite";
import { useRouter } from 'next/router';
import { useStore } from '../../modules';
import styles from './Auth.module.scss';

export default observer(function Login(props) {
  const {authStore} = useStore();
  const router = useRouter();
  async function onSuccess(res, provider) {
    const [success, err] = await authStore.login({ provider, res});
    router.reload();
    if (!success) {
      alert(err);
      return;
    }
  }
  return (
    <div className={styles.login__container}>
      <p className={styles.login__header}>Register / Login</p>
      <GoogleLoginButton onSuccess={(res) => onSuccess(res, 'GOOGLE')} onFailure={() => {}}/>
    </div>
  )
})