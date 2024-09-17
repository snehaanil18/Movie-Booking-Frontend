// next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      name?: string;
      email?: string;
    };
  }

  interface JWT {
    accessToken?: string;
    email?: string;
    name?: string;
  }
}
