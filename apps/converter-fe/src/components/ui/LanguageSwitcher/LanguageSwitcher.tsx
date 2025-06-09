'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';
import { LanguageSwitcherProps } from './LanguageSwitcher.types';
import { Button } from '../Button';

export const LanguageSwitcher = ({ currentLang }: LanguageSwitcherProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${lang}`);
    router.push(newPath);
  };

  return (
    <div className={styles.container}>
      <Button
        variant={currentLang === 'en' ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => handleLanguageChange('en')}
        style={{ marginRight: 8 }}
      >
        EN
      </Button>
      <Button
        variant={currentLang === 'ru' ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => handleLanguageChange('ru')}
      >
        RU
      </Button>
    </div>
  );
};