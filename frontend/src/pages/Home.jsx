import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty'];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getProducts({ limit: 8, sort: 'rating' })
      .then(({ data }) => setProducts(data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-stone-100">
      <section className="bg-gradient-to-r from-indigo-700 to-sky-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-4xl font-bold md:text-5xl">Discover Amazing Products</h1>
          <p className="mt-3 max-w-2xl text-base text-indigo-50 md:text-lg">
            Shop the latest trends with fast delivery and secure checkout. Quality products at unbeatable prices.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/products" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-indigo-700">Shop Now</Link>
            <Link to="/products?category=Electronics" className="rounded-full border border-white px-5 py-3 text-sm font-semibold text-white">Electronics</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">Shop by Category</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((cat) => (
            <Link key={cat} to={`/products?category=${cat}`} className="rounded-2xl border border-stone-200 bg-white p-4 text-center text-sm font-semibold text-slate-700 shadow-sm">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-slate-800">Featured Products</h2>
          <Link to="/products" className="text-sm font-semibold text-indigo-700">View All →</Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center">
            <span className="mb-2 block text-2xl">🚚</span>
            <h3 className="font-bold text-slate-800">Free Shipping</h3>
            <p className="text-sm text-slate-600">On orders over $100</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center">
            <span className="mb-2 block text-2xl">🔒</span>
            <h3 className="font-bold text-slate-800">Secure Payment</h3>
            <p className="text-sm text-slate-600">100% secure checkout</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center">
            <span className="mb-2 block text-2xl">↩️</span>
            <h3 className="font-bold text-slate-800">Easy Returns</h3>
            <p className="text-sm text-slate-600">30-day return policy</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center">
            <span className="mb-2 block text-2xl">💬</span>
            <h3 className="font-bold text-slate-800">24/7 Support</h3>
            <p className="text-sm text-slate-600">Dedicated customer service</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
