import React from 'react';
import styles from './CurrencyList.module.css';
import { BASE_CURRENCIES } from '../../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setValue, convertCurrencies, setSelected } from '../../../store/slices/currenciesSlice';
import { useCallback } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import type { AppDispatch } from '../../../store';
import { CurrencyInput } from '../CurrencyInput';

export const CurrencyList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selected, values, all } = useSelector((state: RootState) => state.currencies);

  const debouncedConvert = useDebounce((code: string, value: string) => {
    dispatch(convertCurrencies({ code, value, selected }));
  }, 400);

  const handleChange = useCallback((code: string, value: string) => {
    dispatch(setValue({ code, value }));
    debouncedConvert(code, value);
  }, [selected]);

  const handleRemove = (code: string) => {
    dispatch(setSelected(selected.filter((c) => c !== code)));
  };

  return (
    <div className={styles.container}>
      {selected.map((code) => {
        const currency = all.find((c) => c.code === code);
        if (!currency) return null;
        return (
          <div key={code} className={styles.currencyRow}>
            <div className={styles.inputWrapper}>
              <CurrencyInput
                code={currency.code}
                nameRu={currency.nameRu}
                nameEn={currency.nameEn}
                value={values[code] || ''}
                onChange={handleChange}
              />
            </div>
            {!BASE_CURRENCIES.includes(code) && (
              <button
                onClick={() => handleRemove(code)}
                className={styles.removeButton}
                title="Удалить валюту"
              >
                ×
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CurrencyList; 