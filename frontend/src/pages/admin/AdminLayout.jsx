import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <div className="mx-auto max-w-6xl px-4 py-8">
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">Admin Panel</h2>
        <nav className="mt-4 space-y-2">
          <NavLink to="/admin" end className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-stone-100">Dashboard</NavLink>
          <NavLink to="/admin/products" className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-stone-100">Products</NavLink>
          <NavLink to="/admin/orders" className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-stone-100">Orders</NavLink>
          <NavLink to="/admin/users" className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-stone-100">Users</NavLink>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;
