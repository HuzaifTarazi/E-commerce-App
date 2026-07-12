import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../services/api';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    orderAPI.getOrder(id)
      .then(({ data }) => setOrder(data))
      .catch((err) => setError(err.response?.data?.message || 'Order not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-8"><Loader /></div>;
  if (error) return <div className="mx-auto max-w-6xl px-4 py-8"><Message variant="error">{error}</Message></div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link to="/orders" className="text-sm font-semibold text-indigo-700">← Back to Orders</Link>
      <h1 className="mt-3 text-3xl font-bold text-slate-800">Order #{order._id.slice(-6).toUpperCase()}</h1>
      <p className="mt-1 text-sm text-slate-500">Placed on {new Date(order.createdAt).toLocaleString()}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">Order Items</h2>
          <div className="mt-4 space-y-3">
            {order.orderItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-stone-50 p-3">
                <img src={item.image?.startsWith('http') ? item.image : item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <Link to={`/products/${item.product}`} className="font-semibold text-slate-800"><strong>{item.name}</strong></Link>
                  <p className="text-sm text-slate-600">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
                <span className="text-sm font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">Shipping</h2>
            <p className="mt-2 text-sm text-slate-600">{order.shippingAddress.address}</p>
            <p className="text-sm text-slate-600">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p className="text-sm text-slate-600">{order.shippingAddress.country}</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">Payment</h2>
            <p className="mt-2 text-sm text-slate-600">Method: {order.paymentMethod}</p>
            <p className="text-sm text-slate-600">Status: {order.isPaid ? 'Paid' : 'Unpaid'}</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">Order Status</h2>
            <p className="mt-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">{order.status}</p>
            {order.isDelivered && <p className="mt-2 text-sm text-slate-600">Delivered: {new Date(order.deliveredAt).toLocaleDateString()}</p>}
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">Summary</h2>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <div className="flex justify-between"><span>Items</span><span>${order.itemsPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${order.shippingPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>${order.taxPrice.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-slate-900"><span>Total</span><span>${order.totalPrice.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
