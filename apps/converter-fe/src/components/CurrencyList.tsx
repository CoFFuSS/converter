'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setValue, convertCurrencies } from '../store/slices/currenciesSlice';
import { CurrencyInput } from './CurrencyInput';
import type { AppDispatch } from '../store';

export const CurrencyList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selected, values, all } = useSelector((state: RootState) => state.currencies);

  const handleChange = (code: string, value: string) => {
    dispatch(setValue({ code, value }));
    dispatch(convertCurrencies({ code, value, selected }));
  };

  return (
    <div>
      {selected.map((code) => {
        const currency = all.find((c) => c.code === code);
        if (!currency) return null;
        return (
          <CurrencyInput
            key={code}
            code={currency.code}
            nameRu={currency.nameRu}
            nameEn={currency.nameEn}
            value={values[code] || ''}
            onChange={handleChange}
          />
        );
      })}
    </div>
  );
}; 