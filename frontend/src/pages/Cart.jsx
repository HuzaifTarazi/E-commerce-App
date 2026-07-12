import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const shipping = cartTotal > 100 ? 0 : cartItems.length > 0 ? 10 : 0;
  const tax = Number((cartTotal * 0.1).toFixed(2));
  const total = cartTotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800">Your cart is empty</h2>
          <p className="mt-2 text-slate-600">Looks like you haven't added anything yet.</p>
          <Link to="/products" className="mt-4 inline-block rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-5 text-3xl font-bold text-slate-800">Shopping Cart</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.product} className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
              <img
                src={item.image?.startsWith('http') ? item.image : item.image}
                alt={item.name}
                className="h-24 w-24 rounded-xl object-cover"
              />
              <div className="flex-1">
                <Link to={`/products/${item.product}`} className="text-lg font-bold text-slate-800"><h3>{item.name}</h3></Link>
                <p className="text-sm text-slate-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-stone-300 px-2 py-1">
                <button onClick={() => updateQuantity(item.product, item.quantity - 1)} className="px-2 text-lg">−</button>
                <span className="text-sm font-semibold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product, item.quantity + 1)} className="px-2 text-lg">+</button>
              </div>
              <p className="text-sm font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</p>
              <button className="text-xl" onClick={() => removeFromCart(item.product)} aria-label="Remove">🗑️</button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <div className="flex justify-between"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-slate-900"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
          {cartTotal < 100 && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-700">Add ${(100 - cartTotal).toFixed(2)} more for free shipping!</p>}
          <div className="mt-4 space-y-2">
            <Link to="/checkout" className="block rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white">Proceed to Checkout</Link>
            <Link to="/products" className="block rounded-xl border border-indigo-500 px-4 py-3 text-center text-sm font-semibold text-indigo-700">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
