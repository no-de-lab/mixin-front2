import React from 'react';
import PropTypes from 'prop-types';
import GoogleLoginButton from './Auth/GoogleLoginButton';
import { observer } from "mobx-react-lite"
import { useStore } from '../modules';


export default observer(function Login(props) {
  const {authStore} = useStore();
  async function onSuccess(res, provider) {
    const [success, err] = await authStore.login({ provider, accessToken: res.tokenId});

    if (!success) {
      alert(err);
      return;
    }
    authStore.setAuth(res.profileObj);

  }
  
  function onFailure() {
    alert('fail to login');
  };
  return (
    <>
      <GoogleLoginButton onSuccess={(res) => onSuccess(res, 'GOOGLE')} onFailure={onFailure} />
    </>
  )
})