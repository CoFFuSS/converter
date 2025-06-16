'use client';

import { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies } from '../../../store/slices/currenciesSlice';
import { useTranslation } from 'react-i18next';
import type { AppDispatch, RootState } from '../../../store';
import styles from './page.module.css';
import { LanguageSwitcher, ThemeSwitcher } from '@/components/ui';
import Link from 'next/link';
import { Currency } from '@/types';

export default function RatesPage({ params }: { params: Promise<{ lng: string }> }) {
	const { lng } = use(params);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const currencies = useSelector((state: RootState) => state.currencies.all);

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
          <tbody>
            {currencies.map((currency: Currency) => {
              const usdRate = currencies.find((c: Currency) => c.code === 'USD')?.rate || 1;
              return (
                <tr key={currency.code}>
                  <td>{currency.code}</td>
                  <td>{lng === 'ru' ? currency.nameRu : currency.nameEn}</td>
                  <td>{(currency.rate / usdRate).toFixed(4)}</td>
                </tr>
              );
            })}
          </tbody>
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