import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { observer } from "mobx-react-lite"
import { useStore } from '../modules';
import Image from 'next/image';
import ROUTE from '@/utils/constant/route';
import { LogoIcon, MenuIcon } from '@/svg';

import styles from './Header.module.scss';
import Modal from './Modal';
import Avatar from '@/components/Avatar';
import Login from './Auth/Login';


function SubbarProfile(props) {
  const {authStore} = props;
  return (
    <div className={styles.subbar_profile}>
      <div className={styles.profile_header}>
        <Avatar imgUrl={authStore.user.imgUrl} />
        <div className={styles.icons}>
          <Image src='/images/svg/url_home.svg' alt='url_home' width={20} height={20} />
          <Image src='/images/svg/url_git.svg' alt='url_git' width={20} height={20} />
        </div>
        <p className={styles.profile_header__name}>{authStore.user.name}</p>
        <p className={styles.profile_header__email}>{authStore.user.email}</p>
      </div> 
    </div>
  )
}
function NavMenu({ children, route }) {
  const router = useRouter();

  return (
    <Link href={`/${route}`}>
      <a
        className={
          router.pathname === `/${route}`
            ? [styles.nav__link, styles.active].join(' ')
            : styles.nav__link
        }
      >
        {children}
      </a>
    </Link>
  );
}

export default observer(function Header() {
  const {authStore} = useStore();
  const [toggleTool, setToggleTool] = useState(false);
  const toggleToolModal = useCallback(() => {
    setToggleTool(!toggleTool);
  }, [toggleTool, setToggleTool]);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.header__nav}>
          <Link href="/">
            <a className={styles.logo}>
              <LogoIcon />
            </a>
          </Link>
          <NavMenu route={ROUTE.CRAWLING}>CRAWLING</NavMenu>
          <NavMenu route={ROUTE.QNA}>Q&A</NavMenu>
          <NavMenu route={ROUTE.DEVELOPER}>DEVELOPERS</NavMenu>
          <MenuIcon
            className={styles.header__subbar}
            handleClick={toggleToolModal}
          />
          <Modal
            position="right"
            visible={toggleTool}
            setVisible={setToggleTool}
            render={authStore.loaded ? <SubbarProfile authStore={authStore} /> : <Login />}
          />
        </nav>
      </header>
    </>
  );
});

// Header.defaultProps = {};

// Header.propTypes = {};

NavMenu.defaultProps = {};

NavMenu.propTypes = {
  children: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

SubbarProfile.propTypes = {
  authStore: PropTypes.object
}
