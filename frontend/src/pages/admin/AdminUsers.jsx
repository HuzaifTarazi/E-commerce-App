import { useEffect, useState } from 'react';
import { authAPI } from '../../services/api';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Pagination from '../../components/Pagination';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchUsers = () => {
    setLoading(true);
    authAPI.getUsers({ page, limit: 10 })
      .then(({ data }) => {
        setUsers(data.users);
        setPages(data.pages);
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await authAPI.deleteUser(id);
      setMessage('User deleted');
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await authAPI.updateUserRole(id, role);
      setMessage('Role updated');
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold text-slate-800">Users</h1>
      {message && <Message variant="success" onClose={() => setMessage('')}>{message}</Message>}
      {error && <Message variant="error" onClose={() => setError('')}>{error}</Message>}
      {loading ? <Loader /> : (
        <>
          <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
            <table className="min-w-full text-sm text-slate-700">
              <thead className="bg-stone-100 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t border-stone-200">
                    <td className="px-4 py-3 font-semibold text-slate-800">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
                        disabled={user.role === 'admin'}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      {user.role !== 'admin' && (
                        <button className="rounded-full bg-red-500 px-3 py-2 text-xs font-semibold text-white" onClick={() => handleDelete(user._id)}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default AdminUsers;
