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
  onChange?: (code: string, value: string) => void;
}

export const CurrencyInput = ({ code, nameRu, nameEn, value, disabled, onChange }: CurrencyInputProps) => {
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
          onChange={onChange ? (e) => onChange(code, e.target.value) : undefined}
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