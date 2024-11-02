
// app/components/AuthProvider.js
'use client';

import { SessionProvider } from 'next-auth/react';
export const dynamic = 'force-dynamic';

export default function AuthProvider({ children, session }) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}