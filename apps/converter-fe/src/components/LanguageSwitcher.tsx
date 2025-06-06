'use client';
import { useRouter, usePathname } from 'next/navigation';

export const LanguageSwitcher = ({ currentLang }: { currentLang: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    router.push(pathname.replace(`/${currentLang}`, `/${newLang}`));
  };

  return (
    <button onClick={toggleLanguage}>
      {currentLang === 'ru' ? '🇷🇺 Русский' : '🇬🇧 English'}
    </button>
  );
}; 