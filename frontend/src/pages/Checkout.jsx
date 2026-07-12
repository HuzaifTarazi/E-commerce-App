import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import Message from '../components/Message';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [address, setAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const shipping = cartTotal > 100 ? 0 : 10;
  const tax = Number((cartTotal * 0.1).toFixed(2));
  const total = cartTotal + shipping + tax;

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const orderItems = cartItems.map(({ product, name, image, price, quantity }) => ({
        product, name, image, price, quantity,
      }));
      const { data } = await orderAPI.createOrder({
        orderItems,
        shippingAddress: address,
        paymentMethod: 'Cash on Delivery',
      });
      clearCart();
      navigate(`/orders/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-5 text-3xl font-bold text-slate-800">Checkout</h1>
      {error && <Message variant="error">{error}</Message>}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <form className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold text-slate-800">Shipping Address</h2>
          <div className="mt-4">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Address</label>
            <input name="address" required value={address.address} onChange={handleChange} placeholder="123 Main St" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2" />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">City</label>
              <input name="city" required value={address.city} onChange={handleChange} placeholder="New York" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Postal Code</label>
              <input name="postalCode" required value={address.postalCode} onChange={handleChange} placeholder="10001" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Country</label>
            <input name="country" required value={address.country} onChange={handleChange} placeholder="United States" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2" />
          </div>

          <h2 className="mt-6 text-xl font-bold text-slate-800">Payment Method</h2>
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-700">
            <input type="radio" id="cod" name="payment" defaultChecked readOnly />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>

          <button type="submit" className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white" disabled={loading}>
            {loading ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
          </button>
        </form>

        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">Order Summary</h2>
          <p className="mt-2 text-sm text-slate-600">Ordering as: <strong>{user?.name}</strong></p>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            {cartItems.map((item) => (
              <div key={item.product} className="flex items-center justify-between gap-3">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex justify-between"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-slate-900"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
