import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabaseAdmin } from './supabase-server';
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
          const { data: user, error } = await supabaseAdmin
            .from('portal_users')
            .select('id, email, name, is_admin, company_name, password_hash')
            .eq('email', credentials.email.toLowerCase())
            .single();

          if (error || !user || !user.password_hash) {
            return null;
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password_hash);
          if (!isValidPassword) {
            return null;
          }

          await supabaseAdmin
            .from('portal_users')
            .update({ last_login_at: new Date().toISOString() })
            .eq('id', user.id);

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
        token.isAdmin = user.isAdmin;
        token.companyName = user.companyName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        session.user.companyName = token.companyName;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
