'use client';

import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/app/i18n';
import { createInstance, i18n } from 'i18next';
import { ReactNode } from 'react';

export default function I18nProvider({
    children,
    locale,
    namespaces,
    resources
}: {
    children: ReactNode;
    locale: string;
    namespaces: string[];
    resources: any;
}) {
    const i18n = createInstance();
    initTranslations(locale, namespaces, i18n, resources);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
} 