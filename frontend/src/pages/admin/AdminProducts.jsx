import { useEffect, useState } from 'react';
import { productAPI } from '../../services/api';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Pagination from '../../components/Pagination';
import ProductForm from './ProductForm';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    productAPI.getProducts({ page, limit: 10 })
      .then(({ data }) => {
        setProducts(data.products);
        setPages(data.pages);
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productAPI.deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditProduct(null);
    fetchProducts();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-slate-800">Products</h1>
        <button className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" onClick={() => { setEditProduct(null); setShowForm(true); }}>
          + Add Product
        </button>
      </div>
      {error && <Message variant="error" onClose={() => setError('')}>{error}</Message>}
      {loading ? <Loader /> : (
        <>
          <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
            <table className="min-w-full text-sm text-slate-700">
              <thead className="bg-stone-100 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-t border-stone-200">
                    <td className="px-4 py-3">
                      <img
                        className="h-12 w-12 rounded-lg object-cover"
                        src={p.image?.startsWith('http') ? p.image : p.image}
                        alt={p.name}
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{p.name}</td>
                    <td className="px-4 py-3">{p.category}</td>
                    <td className="px-4 py-3">${p.price.toFixed(2)}</td>
                    <td className="px-4 py-3">{p.stock}</td>
                    <td className="px-4 py-3">{p.rating.toFixed(1)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="rounded-full border border-indigo-500 px-3 py-2 text-xs font-semibold text-indigo-700" onClick={() => { setEditProduct(p); setShowForm(true); }}>
                          Edit
                        </button>
                        <button className="rounded-full bg-red-500 px-3 py-2 text-xs font-semibold text-white" onClick={() => handleDelete(p._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </>
      )}
      {showForm && (
        <ProductForm
          product={editProduct}
          onSuccess={handleFormSuccess}
          onCancel={() => { setShowForm(false); setEditProduct(null); }}
        />
      )}
    </div>
  );
};

export default AdminProducts;
