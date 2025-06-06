'use client';

import { CurrencyInput } from './CurrencyInput';

export const CurrencyList = () => {
  // Моковые данные для теста темы и внешнего вида
  const currencies = [
    { code: 'USD', nameRu: 'доллар США', nameEn: 'US dollar', value: '1' },
    { code: 'EUR', nameRu: 'евро', nameEn: 'euro', value: '0.92' },
  ];

  return (
    <div>
      {currencies.map((currency) => (
        <CurrencyInput
          key={currency.code}
          code={currency.code}
          nameRu={currency.nameRu}
          nameEn={currency.nameEn}
          value={currency.value}
        />
      ))}
    </div>
  );
}; 