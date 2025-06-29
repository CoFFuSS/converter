'use client';

import { use } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies, convertCurrencies, hydrateFromSessionStorage, setRestored } from '../../store/slices/currenciesSlice';
import { useTranslation } from 'react-i18next';
import type { AppDispatch } from '../../store';
import { RootState } from '../../store';
import styles from './page.module.css';
import { AddCurrencyButton, CurrencyList, LanguageSwitcher, ThemeSwitcher, HistoryList, ChartPage } from '@/components/ui';
import { setActiveTab } from '../../store/slices/uiSlice';

export default function ConverterPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = use(params);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const selected = useSelector((state: RootState) => state.currencies.selected);
  const values = useSelector((state: RootState) => state.currencies.values);
  const hydrated = useSelector((state: RootState) => state.currencies.hydrated);
  const lastChangedCode = useSelector((state: RootState) => state.currencies.lastChangedCode);
  const restored = useSelector((state: RootState) => state.currencies.restored);
  const activeTab = useSelector((state: RootState) => state.ui.activeTab);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(hydrateFromSessionStorage());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated || restored) return;
    if (lastChangedCode && values[lastChangedCode] && values[lastChangedCode] !== '') {
      dispatch(convertCurrencies({ code: lastChangedCode, value: values[lastChangedCode], selected }));
      dispatch(setRestored(true));
    }
  }, [hydrated, lastChangedCode, values, selected, dispatch, restored]);

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <button
          className={`${styles.tab} ${activeTab === 'converter' ? styles.tabActive : ''}`}
          onClick={() => dispatch(setActiveTab('converter'))}
        >
          {t('converter_title')}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'history' ? styles.tabActive : ''}`}
          onClick={() => dispatch(setActiveTab('history'))}
        >
          {t('history')}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'chart' ? styles.tabActive : ''}`}
          onClick={() => dispatch(setActiveTab('chart'))}
        >
          {t('chart')}
        </button>
      </div>
      {activeTab === 'converter' && (
        <>
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
        </>
      )}
      {activeTab === 'history' && (
        <div className={styles.block}>
          <HistoryList />
        </div>
      )}
      {activeTab === 'chart' && (
        <div className={styles.block}>
          <ChartPage />
        </div>
      )}
    </div>
  );
} 