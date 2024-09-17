"use client"; // This makes the component client-side

import { SessionProvider } from 'next-auth/react';

export default function ClientSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}