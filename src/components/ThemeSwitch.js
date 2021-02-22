import CONFIG from '@/config/AppConfig';
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
    <>
      <div className="bg-blue-500 text-gray-200">{mode}</div>
      <button type="button" onClick={toggleMode}>
        테마 버튼
      </button>
    </>
  );
}
