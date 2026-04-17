'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Users, Mail, Trash2, Copy, CheckCircle, Plus, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { BoostIcon } from '@/components/icons/BoostIcon';

interface InviteToken {
  id: string;
  token: string;
  email: string;
  company_name: string | null;
  used: boolean;
  expires_at: string;
  created_at: string;
}

interface PortalUser {
  id: string;
  email: string;
  name: string | null;
  company_name: string | null;
  is_admin: boolean;
  created_at: string;
  last_login_at: string | null;
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

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [invitesRes, usersRes] = await Promise.all([
        fetch('/api/portal/invites'),
        fetch('/api/portal/users'),
      ]);
      const invitesJson = await invitesRes.json();
      const usersJson = await usersRes.json();
      if (invitesRes.ok) setInvites(invitesJson.invites || []);
      if (usersRes.ok) setUsers(usersJson.users || []);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/portal/login');
    } else if (status === 'authenticated') {
      if (!session?.user?.isAdmin) {
        router.push('/portal');
      } else {
        loadData();
      }
    }
  }, [status, session, router, loadData]);

  const createInvite = async () => {
    if (!newInvite.email || !newInvite.company_name) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    try {
      const res = await fetch('/api/portal/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInvite),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to create invite');
        return;
      }
      const emailSuffix = json.emailSent
        ? ' An email has been sent to the client.'
        : ' (Email could not be sent — share the link manually.)';
      setSuccess(`Invite created.${emailSuffix} Link: ${json.inviteUrl}`);
      setNewInvite({ email: '', company_name: '' });
      setShowInviteForm(false);
      loadData();
    } catch (err) {
      setError('Failed to create invite: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const copyInviteLink = (token: string) => {
    const link = `${window.location.origin}/portal/register?token=${token}`;
    navigator.clipboard.writeText(link);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const deleteInvite = async (id: string) => {
    if (!confirm('Delete this invite?')) return;
    const res = await fetch(`/api/portal/invites/${id}`, { method: 'DELETE' });
    if (res.ok) loadData();
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const res = await fetch(`/api/portal/users/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || 'Failed to delete user');
      return;
    }
    loadData();
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!session?.user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
              <Link href="/portal" className="text-brand-blue hover:underline">Client Portal</Link>
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

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
              <button onClick={() => setError('')} className="float-right text-red-600 hover:text-red-800">×</button>
            </div>
          )}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg break-words">
              {success}
              <button onClick={() => setSuccess('')} className="float-right text-green-600 hover:text-green-800">×</button>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Mail className="w-6 h-6 text-brand-blue" />
                <h2 className="text-2xl font-bold text-slate-900">Client Invitations</h2>
              </div>
              <button
                onClick={() => setShowInviteForm(!showInviteForm)}
                className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue-dark transition-colors"
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
                    placeholder="Client email"
                    value={newInvite.email}
                    onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Company name"
                    value={newInvite.company_name}
                    onChange={(e) => setNewInvite({ ...newInvite, company_name: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={createInvite} className="bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue-dark">
                    Send Invitation
                  </button>
                  <button onClick={() => setShowInviteForm(false)} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300">
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
                    invites.map((invite) => {
                      const expired = new Date(invite.expires_at) < new Date();
                      return (
                        <tr key={invite.id} className="border-b border-slate-100">
                          <td className="py-3 px-4">{invite.email}</td>
                          <td className="py-3 px-4">{invite.company_name || '-'}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              invite.used ? 'bg-green-100 text-green-700'
                                : expired ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {invite.used ? 'Used' : expired ? 'Expired' : 'Pending'}
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
                                  className="p-2 text-brand-blue hover:bg-blue-50 rounded"
                                  title="Copy invite link"
                                >
                                  {copiedToken === invite.token ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                </button>
                              )}
                              <button onClick={() => deleteInvite(invite.id)} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Delete invite">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

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
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Last login</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Joined</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-slate-500">No users registered yet.</td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="border-b border-slate-100">
                        <td className="py-3 px-4">{user.name || '-'}</td>
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
                          {user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : '-'}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {!user.is_admin && (
                            <button onClick={() => deleteUser(user.id)} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Delete user">
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
