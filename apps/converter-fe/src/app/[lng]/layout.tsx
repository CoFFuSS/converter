import { dir } from 'i18next';
import { languages } from '../../../i18n';
import I18nProvider from '@/components/I18nProvider';
import initTranslations from '@/app/i18n';
import { ReactNode } from 'react';
import './global.css';
import styles from './layout.module.css';

export async function generateStaticParams() {
    return languages.map((lng: string) => ({ lng }));
}

export async function generateMetadata({ params}: { params: { lng: string } }) {
		const { lng } = await params
    const { t } = await initTranslations(lng, ['common']);
    return {
        title: t('metadata.title'),
        description: t('metadata.description'),
    };
}

export default async function RootLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: { lng: string };
}) {
		const { lng } = await params
    const { resources } = await initTranslations(lng, ['common']);

    return (
        <html lang={lng} dir={dir(lng)} className={styles.html}>
            <head>
                <style>{`
                  body.light {
                    --input-bg: #fff;
                    --input-color: #222;
                    --bg-color: #f5f7fa;
                    --text-color: #222;
                    --box-bg: #fff;
                    --link-color: #1976d2;
                    --secondary-text: #888;
                    --button-bg: #f5f7fa;
                    --button-color: #222;
                    --button-hover: #e5e7eb;
                    background: var(--bg-color);
                    color: var(--text-color);
                  }
                  body.dark {
                    --input-bg: #23272f;
                    --input-color: #f5f7fa;
                    --bg-color: #181a1b;
                    --text-color: #f5f7fa;
                    --box-bg: #23272f;
                    --link-color: #60a5fa;
                    --secondary-text: #9ca3af;
                    --button-bg: #23272f;
                    --button-color: #f5f7fa;
                    --button-hover: #2d3238;
                    background: var(--bg-color);
                    color: var(--text-color);
                  }
                `}</style>
            </head>
            <body className={styles.body}>
                <I18nProvider locale={lng} namespaces={['common']} resources={resources}>
                        {children}
                </I18nProvider>
            </body>
        </html>
    );
} 