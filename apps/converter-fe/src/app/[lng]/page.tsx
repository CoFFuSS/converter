'use client';

import { use } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies, convertCurrencies } from '../../store/slices/currenciesSlice';
import { useTranslation } from 'react-i18next';
import type { AppDispatch } from '../../store';
import { RootState } from '../../store';
import { BASE_CURRENCIES } from '../../constants';
import styles from './page.module.css';
import { AddCurrencyButton, CurrencyList, LanguageSwitcher, ThemeSwitcher } from '@/components/ui';

export default function ConverterPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = use(params);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const selected = useSelector((state: RootState) => state.currencies.selected);
  const values = useSelector((state: RootState) => state.currencies.values);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (
      selected.includes('USD') &&
      BASE_CURRENCIES.every((code) => values[code] === '' || code === 'USD')
    ) {
      dispatch(convertCurrencies({ code: 'USD', value: '1', selected }));
    }
  }, [selected, values, dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('converter_title')}</h1>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher currentLang={lng} />
      </div>
      <div className={styles.nbrb}>{t('by_nbrb')}</div>
      <div className={styles.rate}>{t('official_rate', { date: '01.06.2021' })}</div>
      <div className={styles.block}>
        <CurrencyList />
        <AddCurrencyButton />
      </div>
      <div className={styles.linkRight}>
        <a href={`/${lng}/rates`} className={styles.link}>{t('all_rates')}</a>
      </div>
    </div>
  );
} 