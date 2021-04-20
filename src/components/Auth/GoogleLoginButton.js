import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import LoginButton from './LoginButton';
import { GoogleLogo } from '@/svg';


export default function GoogleLoginButton({ onSuccess, onFailure }) {
  return (
    <>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        buttonText="Login"
        render={renderProps => (
          <LoginButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            imgIcon={<GoogleLogo />}
          >
            Google
          </LoginButton>
        )}
      />
    </>
  );
}

GoogleLoginButton.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
};