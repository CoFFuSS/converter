import { ReactNode } from 'react';
import ClientProviders from '../components/ClientProviders';

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
		<ClientProviders>
			{children}
		</ClientProviders>
    );
}
