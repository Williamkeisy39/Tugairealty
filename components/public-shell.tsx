"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import FloatingWhatsapp from '@/components/floating-whatsapp';
import FloatingSocials from '@/components/floating-socials';

export default function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
      <FloatingWhatsapp />
      <FloatingSocials />
    </>
  );
}
