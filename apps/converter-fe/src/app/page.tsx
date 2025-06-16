'use client';

import { useTranslation } from 'react-i18next';
import { redirect } from 'next/navigation';

export default function ConverterPage() {
  const { t } = useTranslation();

  redirect('/ru');
  return null;
}
