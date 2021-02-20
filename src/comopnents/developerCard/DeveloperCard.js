import React from 'react';
import styles from './DeveloperCard.module.scss';

function DeveloperCardBody({ name, job, rank }) {
    return (
        <div className={styles.cardLayout_body}>
            <div className={styles.cardLayout_body_profile}>
                <div className={styles.profile_name}>
                    {name}
                </div>
                <div className={styles.profile_job}>
                    {job}
                </div>
                <div className={styles.profile_rank}>
                    {rank}
                </div>
            </div>
            <div className={styles.cardLayout_body_avatar}>

            </div>
        </div>
    );
}

function DeveloperCardLinkBar({ socials }) {
    console.log(socials);
    return (
        <div className={styles.cardLayout_linkBar}>
            Linkbar
        </div>
    );
}

function DeveloperCard({ developer }) {
    console.log(developer);
    return (
        <div className={styles.cardLayout}>
            <DeveloperCardBody name={developer.name} job={developer.UserOccupation[0].Occupation.type} rank={developer.userLevel} />
            <DeveloperCardLinkBar socials={developer.SocialUrl} />
        </div>
    );

};

export default DeveloperCard;