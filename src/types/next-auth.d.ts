import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    isAdmin: boolean;
    companyName: string;
    // null = full portal access (staff/admin); a slug (e.g. 'tcs') = locked to /portal/clients/<slug> only
    clientScope: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin: boolean;
      companyName: string;
      clientScope: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    isAdmin: boolean;
    companyName: string;
    clientScope: string | null;
  }
}
