import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Other'];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';

  useEffect(() => {
    setLoading(true);
    setError('');
    const params = { page, limit: 12 };
    if (search) params.search = search;
    if (category && category !== 'All') params.category = category;
    if (sort) params.sort = sort;

    productAPI
      .getProducts(params)
      .then(({ data }) => {
        setProducts(data.products);
        setPages(data.pages);
        setTotal(data.total);
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load products'))
      .finally(() => setLoading(false));
  }, [page, search, category, sort]);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Products</h1>
        <p className="mt-1 text-sm text-slate-500">{total} products found</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800">Categories</h3>
          <ul className="mt-3 space-y-2">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium ${(!category && cat === 'All') || category === cat ? 'bg-indigo-600 text-white' : 'bg-stone-100 text-slate-700'}`}
                  onClick={() => updateFilter('category', cat === 'All' ? '' : cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-lg font-bold text-slate-800">Sort By</h3>
          <select value={sort} onChange={(e) => updateFilter('sort', e.target.value)} className="mt-3 w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm">
            <option value="">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </aside>

        <div>
          {search && (
            <div className="mb-4 flex items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
              <span>Search results for: <strong>"{search}"</strong></span>
              <button className="font-semibold" onClick={() => updateFilter('search', '')}>Clear</button>
            </div>
          )}
          {error && <Message variant="error">{error}</Message>}
          {loading ? (
            <Loader />
          ) : products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center text-slate-600">
              <p>No products found. Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <Pagination page={page} pages={pages} onPageChange={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
