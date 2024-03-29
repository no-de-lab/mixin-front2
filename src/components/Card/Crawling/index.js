/* eslint-disable linebreak-style */
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Toast from '@/components/Toast';
import { Article } from '@/utils/api';
import { handleAsync } from '@/utils/mobx';
import CrawlCard from './CrawlCard';
import CrawlCardComment from './CrawlComment';

export default function CrawlCardLayout({
  // onBookmark,
  // onShare,
  article,
}) {
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

  const [visible, setVisible] = useState(false);
  const [curBookmark, setCurBookmark] = useState(isBookmarked || false);
  const [curComments, setCurComments] = useState([]);

  const onComment = useCallback(async () => {
    const [res, err] = await handleAsync(Article.getComments({ articleId: id }));
    if (res) {
      console.log('get Comments', res);
      setCurComments(res.data);
      setVisible(!visible);
    } else {
      console.log(err);
    }
  }, [curComments, visible, setVisible, setCurComments]);

  const onShare = useCallback(() => {
    navigator.clipboard.writeText(url);
    Toast.notify('URL주소가 복사 되었습니다.');
  }, []);

  const onBookmark = useCallback(async () => {
    const [res, err] = await handleAsync(Article[curBookmark ? 'unbookmark' : 'bookmark']({ articleId: id }));
    if (res) {
      setCurBookmark(!curBookmark);
    } else {
      console.log(err);
    }
  }, [isBookmarked, curBookmark, setCurBookmark]);

  useEffect(() => {
    setCurBookmark(isBookmarked);
  }, [isBookmarked]);

  if (typeof window === 'undefined') return null;
  return (
    <>
      <CrawlCard visible={visible}>
        <CrawlCard.Box>
          <a href={url} rel="noopener noreferrer" target="_blank">
            <CrawlCard.Title>{title}</CrawlCard.Title>
          </a>
          <CrawlCard.Tag tag={article?.hashtag?.length > 0 ? hashtag.split(',').map((t) => `# ${t}`) : ['# -']} />
          <a href={url} rel="noopener noreferrer" target="_blank">
            <CrawlCard.Text line={thumbnail ? 2 : 10}>
              {content || (!thumbnail && title)}
            </CrawlCard.Text>
            <CrawlCard.Img
              src={thumbnail}
              content={content}
              alt="CrawlCard_cover_image"
              url={url}
            />
          </a>
        </CrawlCard.Box>
        <CrawlCard.Footer
          url={url}
          id={id}
          provider={provider}
          isBookmark={curBookmark}
          onBookmark={onBookmark}
          onShare={onShare}
          onComment={onComment}
          count={comments}
        >
          {author || ''}
        </CrawlCard.Footer>
        <CrawlCardComment visible={visible} setVisible={setVisible} article={article} comments={curComments} />
      </CrawlCard>
    </>
  );
}

CrawlCardLayout.defaultProps = {
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
  //   onBookmark: () => {},
  //   onShare: () => {},
  //  onComment:()=>{}
};

CrawlCardLayout.propTypes = {
  article: PropTypes.object,
  // onBookmark: PropTypes.func,
  // onShare: PropTypes.func,
  // onComment: PropTypes.func,
};
