'use client';

import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { useDispatch } from 'react-redux';
import { setTheme, setLanguage } from '@/store/slices/uiSlice';

function UIHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const language = localStorage.getItem('language');
    if (theme && (theme === 'light' || theme === 'dark')) dispatch(setTheme(theme));
    if (language) dispatch(setLanguage(language));
  }, [dispatch]);

  return null;
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <UIHydrator />
      {children}
    </Provider>
  );
} 