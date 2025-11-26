'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Shield, Users, Mail, Trash2, Copy, CheckCircle, Plus, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { BoostIcon } from '@/components/icons/BoostIcon';

interface InviteToken {
  id: string;
  token: string;
  email: string;
  company_name: string;
  used: boolean;
  expires_at: string;
  created_at: string;
}

interface PortalUser {
  id: string;
  email: string;
  name: string;
  company_name: string;
  is_admin: boolean;
  created_at: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [invites, setInvites] = useState<InviteToken[]>([]);
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [newInvite, setNewInvite] = useState({ email: '', company_name: '' });
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/portal/login');
    } else if (status === 'authenticated') {
      // Check if user is admin
      if (!(session?.user as any)?.isAdmin) {
        router.push('/portal');
      } else {
        loadData();
      }
    }
  }, [status, session, router]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load invites
      const { data: inviteData } = await supabase
        .from('invite_tokens')
        .select('*')
        .order('created_at', { ascending: false });

      // Load users
      const { data: userData } = await supabase
        .from('portal_users')
        .select('*')
        .order('created_at', { ascending: false });

      setInvites(inviteData || []);
      setUsers(userData || []);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15) +
           Date.now().toString(36);
  };

  const createInvite = async () => {
    if (!newInvite.email || !newInvite.company_name) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    try {
      const token = generateToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 day expiry

      const { error: insertError } = await supabase
        .from('invite_tokens')
        .insert({
          token,
          email: newInvite.email,
          company_name: newInvite.company_name,
          created_by: session?.user?.email || 'admin',
          expires_at: expiresAt.toISOString(),
        });

      if (insertError) throw insertError;

      setSuccess(`Invite created! Registration link: ${window.location.origin}/portal/register?token=${token}`);
      setNewInvite({ email: '', company_name: '' });
      setShowInviteForm(false);
      loadData();
    } catch (err: any) {
      setError('Failed to create invite: ' + (err.message || 'Unknown error'));
    }
  };

  const copyInviteLink = (token: string) => {
    const link = `${window.location.origin}/portal/register?token=${token}`;
    navigator.clipboard.writeText(link);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const deleteInvite = async (id: string) => {
    try {
      await supabase.from('invite_tokens').delete().eq('id', id);
      loadData();
    } catch (err) {
      console.error('Error deleting invite:', err);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await supabase.from('portal_users').delete().eq('id', id);
      loadData();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!(session?.user as any)?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-dark rounded-lg flex items-center justify-center shadow-lg">
                <BoostIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-800">Admin Portal</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/portal" className="text-blue-600 hover:underline">
                Client Portal
              </Link>
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
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {success}
              <button onClick={() => setSuccess('')} className="float-right text-green-600 hover:text-green-800">×</button>
            </div>
          )}

          {/* Invite Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">Client Invitations</h2>
              </div>
              <button
                onClick={() => setShowInviteForm(!showInviteForm)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Invite
              </button>
            </div>

            {showInviteForm && (
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold mb-4">New Client Invitation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="email"
                    placeholder="Client Email"
                    value={newInvite.email}
                    onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={newInvite.company_name}
                    onChange={(e) => setNewInvite({ ...newInvite, company_name: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={createInvite}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Send Invitation
                  </button>
                  <button
                    onClick={() => setShowInviteForm(false)}
                    className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Company</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Expires</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invites.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-slate-500">
                        No invitations yet. Create one to invite clients.
                      </td>
                    </tr>
                  ) : (
                    invites.map((invite) => (
                      <tr key={invite.id} className="border-b border-slate-100">
                        <td className="py-3 px-4">{invite.email}</td>
                        <td className="py-3 px-4">{invite.company_name}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invite.used
                              ? 'bg-green-100 text-green-700'
                              : new Date(invite.expires_at) < new Date()
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {invite.used ? 'Used' : new Date(invite.expires_at) < new Date() ? 'Expired' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600">
                          {new Date(invite.expires_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {!invite.used && (
                              <button
                                onClick={() => copyInviteLink(invite.token)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                title="Copy invite link"
                              >
                                {copiedToken === invite.token ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            )}
                            <button
                              onClick={() => deleteInvite(invite.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                              title="Delete invite"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Users Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-slate-900">Registered Users</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Company</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Joined</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500">
                        No users registered yet.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="border-b border-slate-100">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.company_name || '-'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.is_admin ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {user.is_admin ? 'Admin' : 'Client'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {!user.is_admin && (
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
