'use client';

import { use, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './page.module.css';
import { LanguageSwitcher, ThemeSwitcher } from '@/components/ui';
import Link from 'next/link';
import { CurrenciesRates } from '@/components/ui/CurrenciesRates/CurreniesRates';
import { fetchCurrencies } from '@/store/slices/currenciesSlice';
import { AppDispatch } from '@/store';

export default function RatesPage({ params }: { params: Promise<{ lng: string }> }) {
	const { lng } = use(params);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher currentLang={lng} />
      </div>
      <h1 className={styles.title}>{t('rates_title')}</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t('currency_code')}</th>
              <th>{t('currency_name')}</th>
              <th>{t('rate_to_usd')}</th>
            </tr>
          </thead>
          <CurrenciesRates lng={lng} />
        </table>
      </div>
      <div className={styles.backButton}>
        <Link href={`/${lng}`} className={styles.link}>
          {t('back_to_converter')}
        </Link>
      </div>
    </div>
  );
} 