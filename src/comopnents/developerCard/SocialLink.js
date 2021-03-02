import React from 'react';
import { GithubIcon, UrlIcon } from '../../../asset/images/svg';

export default function SocialLink({ social }) {
  if (social.type === 'GITHUB') {
    return <GithubIcon />;
  }
  return <UrlIcon />;
}
