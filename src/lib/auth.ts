import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // For now, we'll use a simple hardcoded check
        // TODO: Replace with proper database authentication
        if (credentials?.email === 'client@boostwellbeing.co.nz' && credentials?.password === 'temppassword') {
          return {
            id: '1',
            email: credentials.email,
            name: 'Client Portal User',
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/portal/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
