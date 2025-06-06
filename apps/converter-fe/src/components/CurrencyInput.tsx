'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setValue } from '../store/slices/currenciesSlice';

interface CurrencyInputProps {
  code: string;
  nameRu: string;
  nameEn?: string;
  value: string;
  disabled?: boolean;
}

export const CurrencyInput = ({ code, nameRu, nameEn, value, disabled }: CurrencyInputProps) => {
  // const dispatch = useDispatch();
  // const language = useSelector((state: RootState) => state.ui.language);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(setValue({ code, value: e.target.value }));
  // };
  // Для моковых данных просто отображаем value
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 700, fontSize: 18, width: 48 }}>{code}</span>
        <input
          type="number"
          value={value}
          // onChange={handleChange}
          disabled={disabled}
          style={{
            fontSize: 18,
            padding: '8px 12px',
            border: '1px solid #dbe2ea',
            borderRadius: 6,
            background: 'var(--input-bg, #fff)',
            width: 160,
            outline: 'none',
            color: 'var(--input-color, #222)',
          }}
        />
      </div>
      <div style={{ fontSize: 13, color: '#888', marginLeft: 60, marginTop: 2 }}>
        {nameRu}
      </div>
    </div>
  );
}; 