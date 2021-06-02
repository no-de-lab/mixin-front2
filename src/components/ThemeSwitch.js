import CONFIG from '@/utils/config/AppConfig';
import {
  LightThemeIcon, DarkThemeIcon, CheckAccentIcon, CheckIcon, CloseIcon,
} from '@/svg';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './ThemeSwitch.module.scss';
import Modal from './Modal';

function ThemeModal({ mode, changeMode, toggleModal }) {
  return (
    <div className={styles['theme-modal']}>
      <div className={styles['theme-modal__content']}>
        <h3 className={styles['theme-modal__title']}>THEME</h3>
        <button className={styles['theme-modal__item']} type="button" onClick={changeMode('dark')}>
          {mode === 'dark' ? <CheckAccentIcon /> : <CheckIcon />}
          <span>DARK</span>
        </button>
        <button className={styles['theme-modal__item']} type="button" onClick={changeMode('light')}>
          {mode === 'light' ? <CheckAccentIcon /> : <CheckIcon />}
          <span>LIGHT</span>
        </button>
        <button className={styles['theme-modal__close']} type="button" onClick={toggleModal}><CloseIcon /></button>
      </div>
    </div>
  );
}

export default function ThemeSwitch() {
  const [toggleTheme, setToggleTheme] = useState(false);
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme');
      return theme ? JSON.parse(theme) : CONFIG.DEFAULT_THEME;
    }
    return CONFIG.DEFAULT_THEME;
  });

  const toggleThemeModal = useCallback(() => {
    setToggleTheme(!toggleTheme);
  }, [toggleTheme, setToggleTheme]);

  const changeMode = useCallback((mode) => () => {
    setMode(mode || CONFIG.DEFAULT_THEME);
  }, [mode, setMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', JSON.stringify(mode));
      const bodyEl = document.querySelector('body');
      bodyEl.classList.remove(mode === 'light' ? 'dark' : 'light');
      bodyEl.classList.add(mode);
    }
  }, [mode]);

  return (
    <>
      <button type="button" onClick={toggleThemeModal}>
        {mode === 'light' ? <LightThemeIcon /> : <DarkThemeIcon />}
      </button>
      <Modal
        overlay={false}
        position="theme"
        visible={toggleTheme}
        setVisible={setToggleTheme}
        closeButtonDisplayNone
        render={<ThemeModal mode={mode} changeMode={changeMode} toggleModal={toggleThemeModal} />}
      />
    </>
  );
}
