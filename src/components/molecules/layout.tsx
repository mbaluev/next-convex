'use client';

import { ReactNode } from 'react';
import { Footer } from '@/components/molecules/footer';
import { Header } from '@/components/molecules/header';
import { MenuLeft, MenuRight } from '@/components/molecules/menu';

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
