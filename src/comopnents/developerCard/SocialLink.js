import React from 'react';
import { GithubIcon, UrlIcon } from '../../../asset/images/svg';

export default function SocialLink({ social }) {
  if (social.type === 'GITHUB') {
    return (
      <a href={social.url} rel="noopener noreferrer" target="_blank">
        <GithubIcon />
      </a>
    );
  }
  return (
    <a href={social.url} rel="noopener noreferrer" target="_blank">
      <UrlIcon />
    </a>
  );
}
