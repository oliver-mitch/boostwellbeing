'use client';

import { useState, useEffect, Suspense, type FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Shield, Lock, Mail, User, Building2 } from 'lucide-react';
import Link from 'next/link';

interface InviteDetails {
  email: string;
  company_name: string | null;
  expires_at: string;
}

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [inviteData, setInviteData] = useState<InviteDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!token) {
      setError('No invitation token provided. Please contact your administrator for an invite link.');
      setLoading(false);
      return;
    }

    const validateToken = async () => {
      try {
        const res = await fetch(`/api/auth/register/validate?token=${encodeURIComponent(token)}`);
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || 'Invalid invitation token. Please contact your administrator.');
          setLoading(false);
          return;
        }
        setInviteData(json.invite);
        setLoading(false);
      } catch {
        setError('Failed to validate invitation. Please try again.');
        setLoading(false);
      }
    };
    validateToken();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, name: formData.name, password: formData.password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to create account');
        setSubmitting(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => { router.push('/portal/login'); }, 3000);
    } catch {
      setError('Failed to create account. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Validating invitation...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Created</h2>
            <p className="text-slate-600 mb-4">
              Your account has been created. You&apos;ll be redirected to the login page shortly.
            </p>
            <Link href="/portal/login" className="inline-block bg-brand-blue text-white px-6 py-2 rounded-lg hover:bg-brand-blue-dark">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error && !inviteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Invalid Invitation</h2>
            <p className="text-slate-600 mb-4">{error}</p>
            <Link href="/portal/login" className="text-brand-blue hover:underline">Go to Login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">
              <span className="text-brand-blue">Boost</span>Wellbeing
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-slate-400">Complete your registration to access the portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Invitation for:</strong><br />
              {inviteData?.email}<br />
              {inviteData?.company_name && <span className="text-brand-blue">{inviteData.company_name}</span>}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="name" type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  placeholder="Jane Smith"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email" type="email" disabled
                  value={inviteData?.email || ''}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                />
              </div>
            </div>

            {inviteData?.company_name && (
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="company" type="text" disabled
                    value={inviteData.company_name}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password" type="password" required minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  placeholder="Min. 8 characters"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="confirmPassword" type="password" required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            <button
              type="submit" disabled={submitting}
              className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all disabled:opacity-50"
            >
              {submitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            <p>
              Already have an account?{' '}
              <Link href="/portal/login" className="text-brand-blue hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
