import React from 'react';
import styles from './CurrencyInput.module.css';
import { useTranslation } from 'react-i18next';
import { CurrencyInputProps } from './CurrencyInput.types';

export const CurrencyInput = ({ code, nameRu, nameEn, value, disabled, onChange }: CurrencyInputProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.code}>{code}</span>
        <input
          type="number"
          value={value}
          onChange={onChange ? (e) => onChange(code, e.target.value) : undefined}
          disabled={disabled}
          className={styles.input}
        />
      </div>
      <div className={styles.label}>
        {currentLang === 'ru' ? nameRu : nameEn}
      </div>
    </div>
  );
};

export default CurrencyInput; 