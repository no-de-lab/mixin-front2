import CONFIG from '@/config/AppConfig';
import { LightThemeIcon, DarkThemeIcon } from '@/svg';
import React, { useState, useEffect } from 'react';

export default function ThemeSwitch() {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme');
      return theme ? JSON.parse(theme) : CONFIG.DEFAULT_THEME;
    }
    return CONFIG.DEFAULT_THEME;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', JSON.stringify(mode));
      const bodyEl = document.querySelector('body');
      bodyEl.classList.remove(mode === 'light' ? 'dark' : 'light');
      bodyEl.classList.add(mode);
    }
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <button type="button" onClick={toggleMode}>
      {mode === 'light' ? <LightThemeIcon /> : <DarkThemeIcon />}
    </button>
  );
}
