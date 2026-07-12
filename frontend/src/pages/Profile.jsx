import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Message from '../components/Message';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = { name: form.name, email: form.email };
      if (form.password) data.password = form.password;
      await updateProfile(data);
      setMessage('Profile updated successfully!');
      setForm({ ...form, password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-5 text-3xl font-bold text-slate-800">My Profile</h1>
      {message && <Message variant="success" onClose={() => setMessage('')}>{message}</Message>}
      {error && <Message variant="error" onClose={() => setError('')}>{error}</Message>}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">{user?.name?.charAt(0).toUpperCase()}</div>
          <p className="text-sm font-semibold text-slate-600">{user?.role === 'admin' ? 'Administrator' : 'Customer'}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Full Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">New Password (leave blank to keep current)</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2" />
          </div>
          <button type="submit" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
