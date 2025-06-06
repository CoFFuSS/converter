import { ReactNode } from 'react';
import ClientProviders from '../components/ClientProviders';

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="ru">
            <body>
                <ClientProviders>
                    {children}
                </ClientProviders>
            </body>
        </html>
    );
}
