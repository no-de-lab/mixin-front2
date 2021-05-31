/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import CrawlCard from './CrawlCard';
import styles from './comment.module.scss';

export default function CommentCard({ article }) {
  // date, name, self, profileImg, content

  const {
    isBookmarked,
    provider,
    id,
    url,
    thumbnail,
    title,
    content,
    hashtag,
    author,
    comments,
  } = article;

  return (
    <>
      {/* <CrawlCard type={type}> */}

      <CrawlCard.Box type>
        <a href={url} rel="noopener noreferrer" target="_blank">
          <CrawlCard.Title>{title}</CrawlCard.Title>
        </a>
        <CrawlCard.Tag tag={article?.hashtag?.length > 0 ? hashtag.split(',').map((t) => `# ${t}`) : ['# -']} type />
        <a href={url} rel="noopener noreferrer" target="_blank">
          <CrawlCard.Text line={thumbnail ? 2 : 10} type>{content || (!thumbnail && title)}</CrawlCard.Text>
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
  article: {
    title: 'Title Title Title Title Title Title Title Title Title',
    content:
        'Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text TextText Text',
    hashtag: 'hungry',
    thumbnail: '',
    provider: 'Text',
    url: '/',
    comments: 3,
  },
  onBookmark: () => {},
  onShare: () => {},
  onComment: () => {},
};
