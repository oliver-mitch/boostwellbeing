'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Shield, Heart, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function PortalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/portal/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-800">BoostWellbeing</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Welcome back,</p>
                <p className="font-semibold text-slate-800">{session.user?.name || session.user?.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Client Portal
            </h1>
            <p className="text-xl text-slate-600">
              Welcome to your health plan management dashboard
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Plan Selector Card */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-100 p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Health Plan Selector
              </h2>
              <p className="text-slate-600 mb-6">
                Choose the right Southern Cross health insurance plan for you and your family. Compare plans, add modules, and calculate costs.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Coming Soon:</strong> Interactive plan selector with real-time cost calculations
                </p>
              </div>
              <button
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
                disabled
              >
                Launch Plan Selector
              </button>
            </div>

            {/* Resources Card */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-green-100 p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Your Resources
              </h2>
              <p className="text-slate-600 mb-6">
                Access your personalized wellbeing resources, reports, and support materials.
              </p>
              <div className="space-y-3">
                <Link
                  href="#"
                  className="block px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 font-medium"
                >
                  📊 Your Plan Summary
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 font-medium"
                >
                  📚 Wellbeing Resources
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 font-medium"
                >
                  💬 Contact Support
                </Link>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Integration in Progress
            </h3>
            <p className="text-slate-700 mb-4">
              We're currently integrating the full planSelector functionality into your client portal. This will include:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Interactive plan comparison and selection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Family member management with individual coverage options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Real-time cost calculations based on age and coverage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Optional add-on modules for customized coverage</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
