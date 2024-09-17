import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextApiRequest, NextApiResponse } from 'next';

// Create an instance of NextAuth with your configuration
const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login', // Custom sign-in page URL
  }
});

// Named exports for HTTP methods
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return authHandler(req, res);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  return authHandler(req, res);
}
