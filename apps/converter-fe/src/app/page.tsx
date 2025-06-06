'use client';

import { CurrencyList } from '../components/CurrencyList';
import { AddCurrencyButton } from '../components/AddCurrencyButton';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { redirect } from 'next/navigation';

export default function ConverterPage() {
  const { t } = useTranslation();

  redirect('/ru');
  return null;
}
