import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Message from '../components/Message';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-500">Sign in to your ShopHub account</p>
        {error && <Message variant="error">{error}</Message>}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 outline-none" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Don't have an account? <Link to="/register" className="font-semibold text-indigo-700">Register</Link>
        </p>
        <div className="mt-5 rounded-2xl bg-stone-100 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Demo Accounts:</p>
          <p>Admin: admin@shophub.com / admin123</p>
          <p>User: user@shophub.com / user123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
