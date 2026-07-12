import { useEffect, useState } from 'react';
import { orderAPI } from '../../services/api';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Pagination from '../../components/Pagination';

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchOrders = () => {
    setLoading(true);
    orderAPI.getAllOrders({ page, limit: 10 })
      .then(({ data }) => {
        setOrders(data.orders);
        setPages(data.pages);
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, [page]);

  const handleStatusChange = async (orderId, status) => {
    try {
      await orderAPI.updateOrderStatus(orderId, { status });
      setMessage('Order status updated');
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold text-slate-800">Orders</h1>
      {message && <Message variant="success" onClose={() => setMessage('')}>{message}</Message>}
      {error && <Message variant="error" onClose={() => setError('')}>{error}</Message>}
      {loading ? <Loader /> : (
        <>
          <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
            <table className="min-w-full text-sm text-slate-700">
              <thead className="bg-stone-100 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t border-stone-200">
                    <td className="px-4 py-3 font-semibold text-slate-800">#{order._id.slice(-6).toUpperCase()}</td>
                    <td className="px-4 py-3">{order.user?.name}<br /><small>{order.user?.email}</small></td>
                    <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">${order.totalPrice.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${order.status === 'pending' ? 'bg-amber-100 text-amber-700' : order.status === 'processing' ? 'bg-blue-100 text-blue-700' : order.status === 'shipped' ? 'bg-indigo-100 text-indigo-700' : order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{order.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default AdminOrders;
