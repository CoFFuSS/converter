'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTheme } from '../store/slices/uiSlice';
import { useEffect } from 'react';

export const ThemeSwitcher = () => {
  const theme = useSelector((state: RootState) => state.ui.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌞 Светлая тема' : '🌙 Тёмная тема'}
    </button>
  );
}; 