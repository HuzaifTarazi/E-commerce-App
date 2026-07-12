import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../services/api';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import Message from '../components/Message';

const statusColors = {
  pending: 'status-pending',
  processing: 'status-processing',
  shipped: 'status-shipped',
  delivered: 'status-delivered',
  cancelled: 'status-cancelled',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    orderAPI.getMyOrders({ page, limit: 10 })
      .then(({ data }) => {
        setOrders(data.orders);
        setPages(data.pages);
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-8"><Loader /></div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-5 text-3xl font-bold text-slate-800">My Orders</h1>
      {error && <Message variant="error">{error}</Message>}
      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800">No orders yet</h2>
          <p className="mt-2 text-slate-600">Start shopping to see your orders here.</p>
          <Link to="/products" className="mt-4 inline-block rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Browse Products</Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <strong className="text-slate-800">Order #{order._id.slice(-6).toUpperCase()}</strong>
                    <p className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${statusColors[order.status]}`}>{order.status}</span>
                </div>
                <div className="mt-3 flex flex-col gap-1 text-sm text-slate-600">
                  {order.orderItems.map((item, i) => (
                    <span key={i}>{item.name} × {item.quantity}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <strong className="text-slate-800">${order.totalPrice.toFixed(2)}</strong>
                  <Link to={`/orders/${order._id}`} className="rounded-full border border-indigo-500 px-3 py-2 text-sm font-semibold text-indigo-700">View Details</Link>
                </div>
              </div>
            ))}
          </div>
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default Orders;
