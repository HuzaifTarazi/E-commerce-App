import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Message from '../components/Message';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
        <p className="mt-2 text-sm text-slate-500">Join ShopHub and start shopping</p>
        {error && <Message variant="error">{error}</Message>}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Full Name</label>
            <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="John Doe" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
            <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Password</label>
            <input type="password" name="password" required value={form.password} onChange={handleChange} placeholder="••••••••" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Confirm Password</label>
            <input type="password" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 outline-none" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account? <Link to="/login" className="font-semibold text-indigo-700">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
