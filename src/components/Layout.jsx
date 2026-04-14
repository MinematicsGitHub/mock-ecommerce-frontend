import { Heart, Moon, ShoppingBag, Sun, User } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

function navClassName({ isActive }) {
  return [
    "rounded-full px-4 py-2 text-sm font-medium transition",
    isActive
      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
      : "text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
  ].join(" ");
}

export default function Layout() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { cartCount, wishlistItems } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="container-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <NavLink to="/" className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-600">
                Studio Edit
              </span>
              <span className="text-xl font-semibold tracking-tight">Aurelia Sarees</span>
            </NavLink>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              {isDarkMode ? "Light" : "Dark"}
            </button>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/" className={navClassName} end>
              New Arrivals
            </NavLink>
            <NavLink to="/cart" className={navClassName}>
              <span className="inline-flex items-center gap-2">
                <ShoppingBag size={16} />
                Bag {cartCount ? `(${cartCount})` : ""}
              </span>
            </NavLink>
            <NavLink to="/account" className={navClassName}>
              <span className="inline-flex items-center gap-2">
                <User size={16} />
                Profile
              </span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container-shell py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white/80 py-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
        <div className="container-shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {isAuthenticated
              ? `Signed in as ${currentUser.fullName} for your saree shortlist and checkout.`
              : "Sign in to save your saree shortlist, cart, and checkout details."}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <Heart size={16} />
              Shortlist {wishlistItems.length}
            </span>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  );
}
