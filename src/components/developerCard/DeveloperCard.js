import React from 'react';
import { BookmarkIcon, ProfileIcon } from '../../../asset/images/svg';
import styles from './DeveloperCard.module.scss';
import SocialLink from './SocialLink';

function DeveloperCardBody({
  name, job, rank, imgUrl,
}) {
  return (
    <div className={styles.card_layout__body}>
      <div className={styles.card_layout__body__profile}>
        <div className={styles.profile__name}>{name}</div>
        <div className={styles.profile__job}>
          [
          {job.length ? job[0].Occupation.type : 'No Job'}
          ]
        </div>
        <div className={styles.profile__rank}>{rank}</div>
      </div>
      {imgUrl ? (
        <img
          src={imgUrl}
          alt="user avatar"
          className={styles.card_layout__body__avatar}
        />
      ) : (
        <div className={styles.card_layout__body__avatar}>
          <ProfileIcon />
        </div>
      )}
    </div>
  );
}

function DeveloperCardLinkBar({ socials }) {
  return (
    <div className={styles.card_layout__link_bar}>
      <div className={styles.card_layout__link_bar__social}>
        {socials.map((social) => (
          <div className={styles.icon}>
            <SocialLink social={social} />
          </div>
        ))}
      </div>
      <div className={styles.card_layout__link_bar__bookmark}>
        <BookmarkIcon />
      </div>
    </div>
  );
}

function DeveloperCard({ developerList }) {
  return (
    <>
      {developerList.map((developer) => (
        <div className={styles.card_layout}>
          <DeveloperCardBody
            name={developer.name}
            job={developer.UserOccupation}
            rank={developer.userLevel}
            imgUrl={developer.imgUrl}
          />
          <DeveloperCardLinkBar socials={developer.SocialUrl} />
        </div>
      ))}
    </>
  );
}

export default DeveloperCard;