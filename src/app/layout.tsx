import type { Viewport } from 'next';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from '@/components/atoms/sonner';
import { ThemeProvider } from '@/components/molecules/theme';
import { Spinner } from '@/components/atoms/spinner';
import { Layout } from '@/components/molecules/layout';
import { Check, Info, OctagonX, TriangleAlert } from 'lucide-react';
import { CookiesProvider } from 'next-client-cookies/server';
import { ConvexClientProvider } from '@/lib/providers/convex-client-provider';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { DialogProfile } from '@/components/organisms/dialog-profile';
import { DialogPrivacyPolicy } from '@/components/organisms/dialog-privacy-policy';
import { DialogTermsConditions } from '@/components/organisms/dialog-terms-conditions';
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
  return (
    <ConvexAuthNextjsServerProvider>
      <CookiesProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={font.className}>
            <ConvexClientProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <Layout>{children}</Layout>
                <DialogProfile />
                <DialogPrivacyPolicy />
                <DialogTermsConditions />
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
            </ConvexClientProvider>
          </body>
        </html>
      </CookiesProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
