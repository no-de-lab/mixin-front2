import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BookmarkIcon, ProfileIcon } from '../../../asset/images/svg';
import styles from './DeveloperCard.module.scss';
import SocialLink from './SocialLink';
import { useStore } from '../../modules';
import { handleAsync } from '@/utils/mobx';
import { Developer } from '@/utils/api';

function DeveloperCardBody({
  name, job, rank, imgUrl, onClick
}) {
  return (
    <div className={styles.card_layout__body} onClick={onClick}>
      <div className={styles.card_layout__body__profile}>
        <div className={styles.profile__name}>{name}</div>
        <div className={styles.profile__job}>
          [
          {job?.length ? job[0].Occupation.type : 'No Job'}
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

function DeveloperCardLinkBar({ socials, developerId, isBookmarked, onBookmarkClick }) {
  return (
    <div className={styles.card_layout__link_bar}>
      <div className={styles.card_layout__link_bar__social}>
        {socials?.map((social, i) => (
          <div className={styles.icon} key={`social${i}`}>
            <SocialLink social={social} />
          </div>
        ))}
      </div>
      <div className={styles.card_layout__link_bar__bookmark}>
        <BookmarkIcon onClick={onBookmarkClick} isBookmarked={isBookmarked} />
      </div>
    </div>
  );
}

function DeveloperCard({ developer }) {
  const router = useRouter();
  const { developerStore } = useStore();
  const { name, UserOccupation, userLevel, imgUrl, SocialUrl, id, isBookmarked } = developer;
  const [curDeveloperBookmark, setCurDeveloperBookmark] = useState(isBookmarked || false);
  const routeDetail = () => {
    developerStore.setDeveloper(developer);
    router.push(`/developer/detail/${developer.id}/?page=questions`);
  };

  const onBookmarkClick = async () => {
    const [res, err] = await handleAsync(Developer.bookmarkDeveloper({ targetId: id }));
    if (res) {
      setCurDeveloperBookmark(!curDeveloperBookmark);
    } else {
      console.log(err);
    }
  }
  return (
    <div className={styles.card_layout}>
      <DeveloperCardBody
        name={name}
        job={UserOccupation}
        rank={userLevel}
        imgUrl={imgUrl}
        onClick={routeDetail}
      />
      <DeveloperCardLinkBar
        socials={SocialUrl}
        developerId={id}
        isBookmarked={curDeveloperBookmark}
        onBookmarkClick={onBookmarkClick}
      />
    </div>
  );
}

export default DeveloperCard;
