import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import ROUTE from '@/utils/constant/route';
import { LogoIcon, MenuIcon } from '@/svg';

import styles from './Header.module.scss';
import Modal from './Modal';

import Login from './Login';

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

export default function Header() {
  const [toggleTool, setToggleTool] = useState(false);

  const toggleToolModal = useCallback(() => {
    setToggleTool(!toggleTool);
  }, [toggleTool, setToggleTool]);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.header__nav}>
          <div>
            <Link href="/home">
              <a className={styles.logo}>
                <LogoIcon />
              </a>
            </Link>
          </div>
          <div>
            <NavMenu route={ROUTE.CRAWLING}>CRAWLING</NavMenu>
          </div>
          <div>
            <NavMenu route={ROUTE.QNA}>Q&A</NavMenu>
          </div>
          <div>
            <NavMenu route={ROUTE.DEVELOPER}>DEVELOPERS</NavMenu>
          </div>
          <div>
            <MenuIcon
              className={styles.header__subbar}
              handleClick={toggleToolModal}
            />
          </div>
          <Modal
            position="right"
            visible={toggleTool}
            setVisible={setToggleTool}
            render={<Login />}
          />
        </nav>
      </header>
    </>
  );
}

Header.defaultProps = {};

Header.propTypes = {};

NavMenu.defaultProps = {};

NavMenu.propTypes = {
  children: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};
