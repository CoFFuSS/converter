import React from 'react';
import styles from './AddCurrencyButton.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/store';
import { setSelected } from '@/store/slices/currenciesSlice';

export const AddCurrencyButton = () => {
  const dispatch = useDispatch();
  const { selected, all } = useSelector((state: RootState) => state.currencies);
  const { t } = useTranslation();

  const available = all.filter((c) => !selected.includes(c.code));

  const handleAdd = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    if (code) {
      dispatch(setSelected([...selected, code]));
    }
  };

  return (
    <div className={styles.container}>
      <select 
        onChange={handleAdd} 
        defaultValue=""
        className={styles.select}
      >
        <option value="" disabled>
          {t('add_currency')}
        </option>
        {available.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddCurrencyButton; 