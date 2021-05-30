/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import CrawlCard from './CrawlCard';
import styles from './comment.module.scss';

export default function CommentCard({ dummy }) {
  // date, name, self, profileImg, content
  const {

    url,
    thumbnail,
    title,
    content,
    hashtag,
    type,
  } = dummy;
  return (
    <>
      {/* <CrawlCard type={type}> */}

      <CrawlCard.Box type={type}>
        <a href={url} rel="noopener noreferrer" target="_blank">
          <CrawlCard.Title>{title}</CrawlCard.Title>
        </a>
        <CrawlCard.Tag tag={dummy?.hashtag?.length > 0 ? hashtag.split(',').map((t) => `# ${t}`) : ['# -']} type={type} />
        <a href={url} rel="noopener noreferrer" target="_blank">
          <CrawlCard.Text line={thumbnail ? 2 : 10} type={type}>{content || (!thumbnail && title)}</CrawlCard.Text>
          <CrawlCard.Img
            src={thumbnail}
            content={content}
            alt="CrawlCard_cover_image"
            url={url}
          />
        </a>
      </CrawlCard.Box>
      {/* </CrawlCard> */}

    </>
  );
}

CommentCard.defaultProps = {
  dummy: {
    title: 'Title Title Title Title Title Title Title Title Title',
    content:
      'Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text',
    hashtag: 'hungry',
    thumbnail: '',
    provider: 'Text',
    url: '/',
    type: 'comment',
  },
  onBookmark: () => {},
  onShare: () => {},
  onComment: () => {},
};