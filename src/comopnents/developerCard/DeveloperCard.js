import React from 'react';
import { BookmarkIcon, ProfileIcon } from '../../../asset/images/svg';
import styles from './DeveloperCard.module.scss';
import SocialLink from './SocialLink';

function DeveloperCardBody({ name, job, rank }) {
  return (
    <div className={styles.card_layout__body}>
      <div className={styles.card_layout__body__profile}>
        <div className={styles.profile__name}>{name}</div>
        <div className={styles.profile__job}>{job}</div>
        <div className={styles.profile__rank}>{rank}</div>
      </div>
      <div className={styles.card_layout__body__avatar}>
        <ProfileIcon />
      </div>
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

function DeveloperCard({ developer }) {
  return (
    <div className={styles.card_layout}>
      <DeveloperCardBody
        name={developer.name}
        job={developer.UserOccupation[0].Occupation.type}
        rank={developer.userLevel}
      />
      <DeveloperCardLinkBar socials={developer.SocialUrl} />
    </div>
  );
}

export default DeveloperCard;
