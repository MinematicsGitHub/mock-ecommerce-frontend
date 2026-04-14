import { Heart, ShoppingCart, Sparkles, Star } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { products } from "../data/products";
import { formatCurrency } from "../utils/currency";

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product) => {
    const result = addToCart(product);
    if (!result.ok) {
      showToast(result.message, "warning");
      navigate("/login", { state: { from: location } });
      return;
    }
    showToast(`${product.name} added to cart.`, "success");
  };

  const handleWishlist = (product) => {
    const isSaved = wishlist.includes(product.id);
    const result = toggleWishlist(product.id);
    if (!result.ok) {
      showToast(result.message, "warning");
      navigate("/login", { state: { from: location } });
      return;
    }
    showToast(
      isSaved ? `${product.name} removed from wishlist.` : `${product.name} saved.`,
      "info"
    );
  };

  return (
    <div className="space-y-10">
      <section className="glass-panel overflow-hidden p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-5">
            <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
              New saree drop
            </span>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Sarees that make new-gen women pause, save, and ask for one more look.
            </h1>
            <p className="max-w-xl text-base text-slate-600 dark:text-slate-300">
              Discover organza florals, tissue shimmer, pre-draped ease, and statement
              festive edits curated for women who want elegance with curiosity built in.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to={isAuthenticated ? "/cart" : "/login"} className="btn-primary">
                {isAuthenticated ? "Open checkout" : "Login to shop"}
              </Link>
              <Link to={isAuthenticated ? "/account" : "/register"} className="btn-secondary">
                {isAuthenticated ? "Your account" : "Create account"}
              </Link>
            </div>
            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/80 p-4 shadow-soft dark:bg-slate-900/70">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Login-first cart
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Cart and wishlist stay tied to the signed-in user.
                </p>
              </div>
              <div className="rounded-3xl bg-white/80 p-4 shadow-soft dark:bg-slate-900/70">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Trending edits
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Organza, tissue, hand-painted, and pre-draped silhouettes lead this drop.
                </p>
              </div>
              <div className="rounded-3xl bg-white/80 p-4 shadow-soft dark:bg-slate-900/70">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Fast checkout
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  PhonePe, Google Pay, and card UI are ready in the bag.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-hero-glow p-6">
            <img
              src={products[0].image}
              alt={products[0].name}
              className="h-[320px] w-full rounded-[1.75rem] object-cover shadow-soft"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Latest sarees</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Fresh saree stories for festive plans, wedding guest looks, and polished day events.
            </p>
          </div>
          {!isAuthenticated ? (
            <div className="hidden rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 dark:border-brand-700/40 dark:bg-brand-950/40 dark:text-brand-100 md:inline-flex md:items-center md:gap-2">
              <Sparkles size={16} />
              Login required for cart and wishlist
            </div>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <article
                key={product.id}
                className="glass-panel flex h-full flex-col overflow-hidden"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-60 w-full object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                          {product.category}
                        </p>
                        <Link
                          to={`/product/${product.id}`}
                          className="mt-1 block text-lg font-semibold tracking-tight hover:text-brand-600"
                        >
                          {product.name}
                        </Link>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleWishlist(product)}
                        className={[
                          "rounded-full p-2 transition",
                          isWishlisted
                            ? "bg-rose-100 text-rose-600 dark:bg-rose-950/70 dark:text-rose-200"
                            : "bg-slate-100 text-slate-500 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white",
                        ].join(" ")}
                        aria-label="Toggle wishlist"
                      >
                        <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">{formatCurrency(product.price)}</p>
                      <p className="inline-flex items-center gap-1 text-sm text-slate-500">
                        <Star size={14} className="fill-current text-amber-400" />
                        {product.rating}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="btn-primary px-4 py-2"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
