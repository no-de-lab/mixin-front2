import React from 'react';
// import PropTypes from 'prop-types';
import CommentIcon from '@/svg/CommentIcon';
import ShareIcon from '@/svg/ShareIcon';
import BookmarkIcon from '@/svg/BookmarkIcon';
import styles from './crawlCard.module.scss';
// import CrawlComment from './CrawlComment';

export default function CrawlCard({children, visible, ...props}){
  return <div className={visible? [styles.card_container, styles.border].join(' ') : styles.card_container} {...props}>{children}</div>;
}

CrawlCard.Box = function CrawlCardBox({children, ...props}){
  return <div className={!props.type? styles.card_box : styles.card__comment} {...props}>{children}</div>;
};

CrawlCard.Title = function CrawlCardTitle({children}){
  return <div className={styles.title}>{children}</div>;
};

CrawlCard.Tag = function CrawlCardTag({tag, ...props}){
  return (
    <div className={!props.type? styles.tag : styles.card__comment__tag} {...props}>
      {tag?.length > 0 && tag?.map((c) => (
        <span className="mr-2" key={`${c}`}>{c}</span>
    ))}
    </div>
    );
};

CrawlCard.Img = function CrawlCardImg({src, content, ...props}){
  return (
    <>
      {src && (
        <img className={styles.card_content_Img} {...props} src={src} alt="img" />
      )}
    </>
  );
};

CrawlCard.Text = function CrawlCardText({children, line, ...props}){
  return (
    <>
      {children && (
      <div className={[!props.type? styles.card_content : styles.card__comment__text, line ==2? styles.card_content_withImg : styles.card_content_text].join(' ')} 
           {...props}>{children}</div>
    )}
    </>
  );
};
CrawlCard.Footer = function CrawlCardFooter({children, url,isBookmark, onBookmark, onShare, provider,  count, ...props}){

  
  return (
    <>
      <div className={styles.card_footer} {...props}>
        <div className={styles.card_footer_box}>
          <div className={styles.card_footer_box_left}>
            <img
            // eslint-disable-next-line no-nested-ternary
              src={provider === 'DEVTO'? `https://dev-to.s3.us-east-2.amazonaws.com/favicon.ico` : provider === 'YOUTUBE' ? `https://www.youtube.com/s/desktop/80d87ec4/img/favicon_32.png`
              : `https://static.velog.io/favicon.ico`}
              alt="img"
            />
            <a href={url} rel="noreferrer" target="_blank">{children}</a>
          </div>
          <div className={styles.card_footer_box_right}>
            <ShareIcon onClick={onShare} className={styles.card__icon} />
            <CommentIcon className={styles.card__icon} count={count} {...props} />
            <BookmarkIcon onClick={onBookmark} className={styles.card__icon} />
          </div>
          
        </div>

      </div>
    </>
  );
};
