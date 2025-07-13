import type { Viewport } from 'next';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth/auth';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/molecules/layout/theme';
import { Spinner } from '@/components/ui/spinner';
import { Layout } from '@/components/molecules/layout/layout';
import { Check, Info, OctagonX, TriangleAlert } from 'lucide-react';
import { CookiesProvider } from 'next-client-cookies/server';
import { Dialogs } from '@/components/molecules/layout/dialogs';
import './globals.css';

const font = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${process.env.APP_NAME}`,
  description: 'authentication service',
  icons: {
    icon: {
      url: '/favicon.ico',
      href: '/favicon.ico',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <CookiesProvider>
      <SessionProvider session={session}>
        <html lang="en" suppressHydrationWarning>
          <body className={font.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Layout>{children}</Layout>
              <Dialogs />
              <Toaster
                visibleToasts={5}
                position="bottom-right"
                className={font.className}
                toastOptions={{
                  unstyled: true,
                  classNames: {
                    toast: 'flex gap-x-3 px-5 py-4 w-full rounded-lg border-2 bg-card',
                    title: '',
                    icon: 'm-0',
                    closeButton: 'bg-background hover:bg-secondary border-none',
                    success: 'text-success border-success',
                    warning: 'text-warning border-warning',
                    error: 'text-destructive border-destructive',
                    info: 'text-primary border-primary',
                  },
                }}
                icons={{
                  success: <Check />,
                  info: <Info />,
                  warning: <TriangleAlert />,
                  error: <OctagonX />,
                  loading: <Spinner />,
                }}
              />
            </ThemeProvider>
          </body>
        </html>
      </SessionProvider>
    </CookiesProvider>
  );
}
