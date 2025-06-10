import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { fetchCurrencies } from '@/store/slices/currenciesSlice';
import { AddCurrencyButton, CurrencyList } from '..';
import styles from './CurrencyConverter.module.css';

export const CurrencyConverter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { all: currencies, loading, error } = useSelector(
    (state: RootState) => state.currencies
  );

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <CurrencyList />
      <AddCurrencyButton />
    </div>
  );
}; 