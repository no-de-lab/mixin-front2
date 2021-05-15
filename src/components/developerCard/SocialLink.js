import React from 'react';
import { GithubIcon, UrlIcon } from '../../../asset/images/svg';

export default function SocialLink({ social }) {
  const socialUrl = social.url.search('http') === -1 ? `https://${social.url}` : social.url;
  if (social.type === 'GITHUB') {
    return (
      <a href={socialUrl} rel="noopener noreferrer" target="_blank">
        <GithubIcon />
      </a>
    );
  }
  return (
    <a href={socialUrl} rel="noopener noreferrer" target="_blank">
      <UrlIcon />
    </a>
  );
}
