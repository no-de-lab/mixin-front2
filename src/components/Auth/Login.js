import React from 'react';
import PropTypes from 'prop-types';
import GoogleLoginButton from './GoogleLoginButton';
import { observer } from "mobx-react-lite"
import { useStore } from '../../modules';
import styles from './Auth.module.scss';

export default observer(function Login(props) {
  const {authStore} = useStore();

  async function onSuccess(res, provider) {
    const [success, err] = await authStore.login({ provider, res});
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