import axios from 'axios';

const mainURL = import.meta.env.VITE_API_URL

const API = axios.create({
  baseURL: `${mainURL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/users/register', data),
  login: (data) => API.post('/users/login', data),
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data) => API.put('/users/profile', data),
  getUsers: (params) => API.get('/users', { params }),
  deleteUser: (id) => API.delete(`/users/${id}`),
  updateUserRole: (id, role) => API.put(`/users/${id}/role`, { role }),
};

export const productAPI = {
  getProducts: (params) => API.get('/products', { params }),
  getProduct: (id) => API.get(`/products/${id}`),
  getCategories: () => API.get('/products/categories'),
  createProduct: (data) => {
    const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    return API.post('/products', data, config);
  },
  updateProduct: (id, data) => {
    const config = data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    return API.put(`/products/${id}`, data, config);
  },
  deleteProduct: (id) => API.delete(`/products/${id}`),
  addReview: (id, data) => API.post(`/products/${id}/reviews`, data),
};

export const orderAPI = {
  createOrder: (data) => API.post('/orders', data),
  getMyOrders: (params) => API.get('/orders/myorders', { params }),
  getOrder: (id) => API.get(`/orders/${id}`),
  getAllOrders: (params) => API.get('/orders/all', { params }),
  updateOrderStatus: (id, data) => API.put(`/orders/${id}/status`, data),
  getStats: () => API.get('/orders/stats'),
};

export const wishlistAPI = {
  getWishlist: () => API.get('/wishlist'),
  addToWishlist: (productId) => API.post(`/wishlist/${productId}`),
  removeFromWishlist: (productId) => API.delete(`/wishlist/${productId}`),
};

export default API;
