import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setTheme } from '@/store/slices/uiSlice';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';

export const ThemeSwitcher = () => {
  const theme = useSelector((state: RootState) => state.ui.theme);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Button onClick={toggleTheme} variant="secondary" size="sm">
      {theme === 'light' ? `🌞 ${t('light_theme')}` : `🌙 ${t('dark_theme')}`}
    </Button>
  );
};

export default ThemeSwitcher; 