import { useState } from 'react';
import { productAPI } from '../../services/api';
import Message from '../../components/Message';

const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Other'];

const ProductForm = ({ product, onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || 'Electronics',
    stock: product?.stock || '',
    brand: product?.brand || '',
    image: product?.image || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key !== 'image' || !imageFile) formData.append(key, val);
      });
      if (imageFile) formData.append('image', imageFile);

      if (product) {
        await productAPI.updateProduct(product._id, imageFile ? formData : form);
      } else {
        await productAPI.createProduct(imageFile ? formData : form);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">{product ? 'Edit Product' : 'Add Product'}</h2>
        {error && <Message variant="error">{error}</Message>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Name</label>
            <input className="w-full rounded-xl border border-stone-300 px-3 py-2" name="name" required value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
            <textarea className="w-full rounded-xl border border-stone-300 px-3 py-2" name="description" required rows={3} value={form.description} onChange={handleChange} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Price ($)</label>
              <input className="w-full rounded-xl border border-stone-300 px-3 py-2" name="price" type="number" step="0.01" min="0" required value={form.price} onChange={handleChange} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Stock</label>
              <input className="w-full rounded-xl border border-stone-300 px-3 py-2" name="stock" type="number" min="0" required value={form.stock} onChange={handleChange} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Category</label>
              <select className="w-full rounded-xl border border-stone-300 px-3 py-2" name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Brand</label>
              <input className="w-full rounded-xl border border-stone-300 px-3 py-2" name="brand" value={form.brand} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Upload Image</label>
            <input className="w-full rounded-xl border border-stone-300 px-3 py-2" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          </div>
          {!imageFile && (
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Or Image URL</label>
              <input className="w-full rounded-xl border border-stone-300 px-3 py-2" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-slate-700" onClick={onCancel}>Cancel</button>
            <button type="submit" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
