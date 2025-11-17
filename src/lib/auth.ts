import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from './supabase';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Query user from database
          const { data: user, error } = await supabase
            .from('portal_users')
            .select('id, email, name, is_admin, company_name, password_hash')
            .eq('email', credentials.email)
            .single();

          if (error || !user) {
            console.error('User not found:', error);
            return null;
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(credentials.password, user.password_hash || '');

          if (!isValidPassword) {
            console.error('Invalid password');
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name || user.email,
            isAdmin: user.is_admin || false,
            companyName: user.company_name || '',
          };
        } catch (err) {
          console.error('Auth error:', err);
          return null;
        }
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
        token.isAdmin = (user as any).isAdmin;
        token.companyName = (user as any).companyName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).isAdmin = token.isAdmin;
        (session.user as any).companyName = token.companyName;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
