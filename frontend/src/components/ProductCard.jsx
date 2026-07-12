import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const ProductCard = ({ product, onWishlistToggle, isInWishlist }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : product.image?.startsWith('/uploads')
      ? product.image
      : product.image || 'https://via.placeholder.com/300x300?text=No+Image';

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!user) return;
    setWishlistLoading(true);
    try {
      await onWishlistToggle(product._id);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <Link to={`/products/${product._id}`} className="flex h-full flex-col">
        <div className="relative">
          <img src={imageUrl} alt={product.name} loading="lazy" className="h-56 w-full object-cover" />
          {product.stock === 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">Out of Stock</span>
          )}
          {user && onWishlistToggle && (
            <button
              className={`absolute right-3 top-3 rounded-full px-2 py-1 text-lg ${isInWishlist ? 'bg-red-100' : 'bg-white/90'}`}
              onClick={handleWishlist}
              disabled={wishlistLoading}
              aria-label="Toggle wishlist"
            >
              {isInWishlist ? '❤️' : '🤍'}
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{product.category}</span>
          <h3 className="text-base font-bold text-slate-800">{product.name}</h3>
          <div className="text-sm text-amber-500">
            {'★'.repeat(Math.round(product.rating || 0))}
            {'☆'.repeat(5 - Math.round(product.rating || 0))}
            <span className="ml-1 text-slate-500">({product.numReviews || 0})</span>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between border-t border-stone-200 p-4">
        <span className="text-lg font-bold text-slate-800">${product.price.toFixed(2)}</span>
        <button
          className="rounded-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
