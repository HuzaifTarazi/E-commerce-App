import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, wishlistAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [inWishlist, setInWishlist] = useState(false);

  const fetchProduct = () => {
    productAPI.getProduct(id)
      .then(({ data }) => setProduct(data))
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProduct();
    if (user) {
      wishlistAPI.getWishlist()
        .then(({ data }) => setInWishlist(data.some((p) => p._id === id)))
        .catch(() => {});
    }
  }, [id, user]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setMessage('Added to cart!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleWishlist = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      if (inWishlist) {
        await wishlistAPI.removeFromWishlist(id);
        setInWishlist(false);
      } else {
        await wishlistAPI.addToWishlist(id);
        setInWishlist(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Wishlist error');
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await productAPI.addReview(id, review);
      setMessage('Review submitted!');
      setReview({ rating: 5, comment: '' });
      fetchProduct();
    } catch (err) {
      setError(err.response?.data?.message || 'Review failed');
    }
  };

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-8"><Loader /></div>;
  if (error && !product) return <div className="mx-auto max-w-6xl px-4 py-8"><Message variant="error">{error}</Message></div>;

  const imageUrl = product.image?.startsWith('http') ? product.image : product.image;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {message && <Message variant="success" onClose={() => setMessage('')}>{message}</Message>}
      {error && <Message variant="error" onClose={() => setError('')}>{error}</Message>}

      <div className="grid gap-6 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm md:grid-cols-2 md:p-6">
        <div className="overflow-hidden rounded-2xl bg-stone-100">
          <img src={imageUrl} alt={product.name} className="h-full min-h-72 w-full object-cover" />
        </div>
        <div>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">{product.category}</span>
          <h1 className="mt-3 text-3xl font-bold text-slate-800">{product.name}</h1>
          <div className="mt-2 text-amber-500">
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
            <span className="ml-2 text-sm text-slate-600">{product.rating.toFixed(1)} ({product.numReviews} reviews)</span>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-800">${product.price.toFixed(2)}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
          <p className="mt-3 text-sm font-semibold text-slate-700">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
          {product.brand && <p className="mt-1 text-sm text-slate-600">Brand: {product.brand}</p>}

          {product.stock > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-stone-300 px-2 py-1">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2 text-lg">−</button>
                <span className="text-sm font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-2 text-lg">+</button>
              </div>
              <button className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" onClick={handleAddToCart}>Add to Cart</button>
              <button className={`rounded-full border px-4 py-2 text-sm font-semibold ${inWishlist ? 'border-red-300 bg-red-50 text-red-700' : 'border-stone-300 bg-white text-slate-700'}`} onClick={handleWishlist}>
                {inWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
              </button>
            </div>
          )}
        </div>
      </div>

      <section className="mt-8 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm md:p-6">
        <h2 className="text-2xl font-bold text-slate-800">Customer Reviews</h2>
        {product.reviews?.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="mt-4 space-y-3">
            {product.reviews?.map((r) => (
              <div key={r._id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-slate-800">{r.name}</strong>
                  <span className="text-amber-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{r.comment}</p>
                <small className="mt-2 block text-xs text-slate-500">{new Date(r.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        )}

        {user && (
          <form className="mt-6 rounded-2xl bg-stone-50 p-4" onSubmit={handleReview}>
            <h3 className="text-lg font-bold text-slate-800">Write a Review</h3>
            <div className="mt-3">
              <label className="mb-1 block text-sm font-semibold text-slate-700">Rating</label>
              <select value={review.rating} onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })} className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2">
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} Stars</option>
                ))}
              </select>
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-sm font-semibold text-slate-700">Comment</label>
              <textarea
                required
                rows={4}
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                placeholder="Share your experience..."
                className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2"
              />
            </div>
            <button type="submit" className="mt-4 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Submit Review</button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ProductDetail;
