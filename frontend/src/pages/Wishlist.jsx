import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { wishlistAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWishlist = () => {
    wishlistAPI.getWishlist()
      .then(({ data }) => setProducts(data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load wishlist'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchWishlist(); }, []);

  const handleWishlistToggle = async (productId) => {
    await wishlistAPI.removeFromWishlist(productId);
    setProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-8"><Loader /></div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-5 text-3xl font-bold text-slate-800">My Wishlist</h1>
      {error && <Message variant="error">{error}</Message>}
      {products.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800">Your wishlist is empty</h2>
          <p className="mt-2 text-slate-600">Save products you love for later.</p>
          <Link to="/products" className="mt-4 inline-block rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Browse Products</Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isInWishlist
              onWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
