'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const RatesTable = () => {
  const { allRates } = useSelector((state: RootState) => state.currencies);
  const language = useSelector((state: RootState) => state.ui.language);

  return (
    <table style={{ width: '100%', marginTop: 24 }}>
      <thead>
        <tr>
          <th>Код</th>
          <th>Название</th>
          <th>Курс</th>
          <th>Масштаб</th>
        </tr>
      </thead>
      <tbody>
        {allRates.map((c) => (
          <tr key={c.code}>
            <td>{c.code}</td>
            <td>{language === 'ru' ? c.nameRu : c.nameEn}</td>
            <td>{c.rate}</td>
            <td>{c.scale}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}; 