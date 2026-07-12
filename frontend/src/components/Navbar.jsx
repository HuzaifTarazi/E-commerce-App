import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-indigo-700" onClick={() => setMenuOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm text-white">S</span>
          ShopHub
        </Link>

        <form className="hidden flex-1 md:flex" onSubmit={handleSearch}>
          <div className="flex w-full items-center rounded-full border border-stone-300 bg-stone-100 px-3 py-2">
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
            <button type="submit" className="ml-2 text-lg" aria-label="Search">🔍</button>
          </div>
        </form>

        <button className="ml-auto rounded-full border border-stone-300 px-3 py-1 text-sm md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`${menuOpen ? 'absolute left-4 right-4 top-[72px] flex flex-col gap-2 rounded-2xl border border-stone-200 bg-white p-4 shadow-lg md:static md:flex md:flex-1 md:items-center md:justify-end md:gap-4 md:border-0 md:bg-transparent md:p-0 md:shadow-none' : 'hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-4'}`}>
          <Link to="/products" className="text-sm font-medium text-slate-700" onClick={() => setMenuOpen(false)}>Products</Link>
          {user && <Link to="/wishlist" className="text-sm font-medium text-slate-700" onClick={() => setMenuOpen(false)}>Wishlist</Link>}
          {user && <Link to="/orders" className="text-sm font-medium text-slate-700" onClick={() => setMenuOpen(false)}>Orders</Link>}
          {isAdmin && <Link to="/admin" className="text-sm font-medium text-slate-700" onClick={() => setMenuOpen(false)}>Admin</Link>}
          <Link to="/cart" className="flex items-center gap-2 rounded-full bg-stone-100 px-3 py-2 text-sm font-semibold text-slate-700" onClick={() => setMenuOpen(false)}>
            🛒 Cart
            {cartCount > 0 && <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white">{cartCount}</span>}
          </Link>
          {user ? (
            <div className="flex items-center gap-2 md:gap-3">
              <Link to="/profile" className="text-sm font-semibold text-slate-700" onClick={() => setMenuOpen(false)}>{user.name}</Link>
              <button className="rounded-full border border-indigo-500 px-3 py-2 text-sm font-semibold text-indigo-600" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
