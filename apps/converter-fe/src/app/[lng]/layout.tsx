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
                    background: #f5f7fa;
                  }
                  body.dark {
                    --input-bg: #23272f;
                    --input-color: #f5f7fa;
                    background: #181a1b;
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