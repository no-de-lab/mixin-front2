import React from 'react';
import PropTypes from 'prop-types';
import GoogleLoginButton from './Auth/GoogleLoginButton';
import { observer } from "mobx-react-lite"
import { useStore } from '../modules';


export default observer(function Login(props) {
  const {authStore} = useStore('');
  async function onSuccess(res, provider) {

    const {accessToken} = res;  
    
    
    const [success, err] = await authStore.login({ provider, accessToken});
    if (!success) {
      alert(err);
      return;
    }
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