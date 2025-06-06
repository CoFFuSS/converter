'use client';

import { CurrencyList } from '../../components/CurrencyList';
import { AddCurrencyButton } from '../../components/AddCurrencyButton';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function ConverterPage({ params }: { params: { lng: string } }) {
  const { t } = useTranslation();
  const lng = params.lng;

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
      <h1>{t('converter_title')}</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <ThemeSwitcher />
        <LanguageSwitcher currentLang={lng} />
      </div>
      <div style={{ color: '#1976d2', fontWeight: 500, marginBottom: 8 }}>{t('by_nbrb')}</div>
      <div style={{ fontSize: 14, color: '#888', marginBottom: 16 }}>{t('official_rate', { date: '01.06.2021' })}</div>
      <div style={{ background: '#f5f7fa', borderRadius: 8, padding: 16 }}>
        <CurrencyList />
        <AddCurrencyButton />
      </div>
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <a href={`/${lng}/rates`} style={{ color: '#1976d2' }}>{t('all_rates')}</a>
      </div>
    </div>
  );
} 