'use client';

import { ReactNode } from 'react';
import { Footer } from '@/components/molecules/layout/footer';
import { Header } from '@/components/molecules/layout/header';
import { MenuLeft, MenuRight } from '@/components/molecules/layout/menu';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MenuLeft>
      <MenuRight>
        <div className="flex flex-col flex-grow">
          <Header />
          <main className="flex flex-col flex-grow">{children}</main>
          <Footer />
        </div>
      </MenuRight>
    </MenuLeft>
  );
};
