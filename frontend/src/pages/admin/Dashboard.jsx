import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../../services/api';
import Loader from '../../components/Loader';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getStats()
      .then(({ data }) => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold text-slate-800">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
          <span className="text-3xl">📦</span>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-slate-800">{stats.totalProducts}</h3>
            <p className="text-sm text-slate-500">Total Products</p>
          </div>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
          <span className="text-3xl">🛒</span>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-slate-800">{stats.totalOrders}</h3>
            <p className="text-sm text-slate-500">Total Orders</p>
          </div>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
          <span className="text-3xl">👥</span>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-slate-800">{stats.totalUsers}</h3>
            <p className="text-sm text-slate-500">Total Users</p>
          </div>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
          <span className="text-3xl">💰</span>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-slate-800">${stats.totalRevenue.toFixed(2)}</h3>
            <p className="text-sm text-slate-500">Total Revenue</p>
          </div>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <span className="text-3xl">⏳</span>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-slate-800">{stats.pendingOrders}</h3>
            <p className="text-sm text-slate-500">Pending Orders</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link to="/admin/products" className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400">
          <h3 className="text-lg font-bold text-slate-800">Manage Products</h3>
          <p className="mt-1 text-sm text-slate-500">Add, edit, or delete products</p>
        </Link>
        <Link to="/admin/orders" className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400">
          <h3 className="text-lg font-bold text-slate-800">Manage Orders</h3>
          <p className="mt-1 text-sm text-slate-500">View and update order status</p>
        </Link>
        <Link to="/admin/users" className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400">
          <h3 className="text-lg font-bold text-slate-800">Manage Users</h3>
          <p className="mt-1 text-sm text-slate-500">View and manage user accounts</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
