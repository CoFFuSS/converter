import { NextResponse, NextRequest } from 'next/server';
import { i18n } from '../i18n';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isCorrectLocale = i18n.locales.some((locale) =>
    pathname.startsWith(`/${locale}/`)
  );
  if (isCorrectLocale) {
    return NextResponse.next();
  }

  // 3. Если локаль есть, но она некорректная
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0) {
    const potentialLocale = pathSegments[0];
    if (!i18n.locales.includes(potentialLocale)) {
      const locale = i18n.defaultLocale;
      const newPathname = `/${locale}/${pathSegments.slice(1).join('/')}`;
      return NextResponse.redirect(new URL(newPathname, request.url));
    }
  }
}

export const config = {
  matcher: [
    // Пропускаем все внутренние пути Next.js и статические файлы
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};
