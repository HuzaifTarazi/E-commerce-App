import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-stone-200 bg-white">
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-4">
      <div>
        <div className="mb-3 flex items-center gap-2 text-lg font-bold text-indigo-700">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm text-white">S</span>
          ShopHub
        </div>
        <p className="text-sm text-slate-600">Your one-stop place for cheap and simple online shopping.</p>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-slate-800">Quick Links</h3>
        <div className="flex flex-col gap-1 text-sm text-slate-600">
          <Link to="/products">All Products</Link>
          <Link to="/cart">Shopping Cart</Link>
          <Link to="/login">Account</Link>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-slate-800">Categories</h3>
        <div className="flex flex-col gap-1 text-sm text-slate-600">
          <Link to="/products?category=Electronics">Electronics</Link>
          <Link to="/products?category=Clothing">Clothing</Link>
          <Link to="/products?category=Sports">Sports</Link>
          <Link to="/products?category=Books">Books</Link>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-slate-800">Contact</h3>
        <div className="text-sm text-slate-600">
          <p>support@shophub.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
    </div>

    <div className="border-t border-stone-200 bg-stone-100 py-3">
      <div className="mx-auto max-w-6xl px-4 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} ShopHub. Built with React, Express, Node.js & MongoDB.
      </div>
    </div>
  </footer>
);

export default Footer;
