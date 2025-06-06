'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSelected } from '../store/slices/currenciesSlice';
import { useTranslation } from 'react-i18next';

export const AddCurrencyButton = () => {
  const dispatch = useDispatch();
  const { selected, allRates } = useSelector((state: RootState) => state.currencies);
  const { t } = useTranslation();

  const available = allRates.filter((c) => !selected.includes(c.code));

  const handleAdd = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    if (code) {
      dispatch(setSelected([...selected, code]));
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <select onChange={handleAdd} defaultValue="">
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