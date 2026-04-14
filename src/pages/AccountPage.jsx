import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/currency";

export default function AccountPage() {
  const { currentUser, logout, users } = useAuth();
  const { cartCount, total, wishlistItems } = useCart();

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="glass-panel space-y-5 p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            Style profile
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {currentUser.fullName}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {currentUser.email}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-900">
            <p className="text-sm text-slate-500">Registered members</p>
            <p className="mt-2 text-2xl font-semibold">{users.length}</p>
          </div>
          <div className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-900">
            <p className="text-sm text-slate-500">Wishlist items</p>
            <p className="mt-2 text-2xl font-semibold">{wishlistItems.length}</p>
          </div>
          <div className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-900">
            <p className="text-sm text-slate-500">Bag quantity</p>
            <p className="mt-2 text-2xl font-semibold">{cartCount}</p>
          </div>
          <div className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-900">
            <p className="text-sm text-slate-500">Bag total</p>
            <p className="mt-2 text-2xl font-semibold">{formatCurrency(total)}</p>
          </div>
        </div>

        <button type="button" onClick={logout} className="btn-secondary">
          Logout
        </button>
      </section>

      <section className="glass-panel space-y-4 p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Closet details</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-900">
            <dt className="text-slate-500">User id</dt>
            <dd className="font-medium">{currentUser.id}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-900">
            <dt className="text-slate-500">Created</dt>
            <dd className="font-medium">
              {new Date(currentUser.createdAt).toLocaleString()}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-900">
            <dt className="text-slate-500">Preferred checkout</dt>
            <dd className="font-medium">PhonePe, GPay, Card</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
