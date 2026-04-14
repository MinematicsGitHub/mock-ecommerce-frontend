import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { products } from "../data/products";
import { formatCurrency } from "../utils/currency";

export default function ProductDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const product = products.find((item) => item.id === Number(id));
  const { addToCart, cartItems, updateQuantity, wishlist, toggleWishlist } = useCart();
  const { showToast } = useToast();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [id]);

  if (!product) {
    return (
      <div className="glass-panel space-y-4 p-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Product not found</h1>
        <p className="text-slate-600 dark:text-slate-300">
          The requested product does not exist in the local catalog.
        </p>
        <Link to="/" className="btn-primary">
          Back to shop
        </Link>
      </div>
    );
  }

  const gallery = product.images?.length ? product.images : [product.image];
  const cartItem = cartItems.find((item) => item.id === product.id);
  const isWishlisted = wishlist.includes(product.id);

  const handleAdd = () => {
    const result = addToCart(product);
    if (!result.ok) {
      showToast(result.message, "warning");
      navigate("/login", { state: { from: location } });
      return;
    }
    showToast(`${product.name} added to cart.`, "success");
  };

  const handleWishlist = () => {
    const result = toggleWishlist(product.id);
    if (!result.ok) {
      showToast(result.message, "warning");
      navigate("/login", { state: { from: location } });
      return;
    }
    showToast(
      isWishlisted ? `${product.name} removed from wishlist.` : `${product.name} saved.`,
      "info"
    );
  };

  const showPrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const showNextImage = () => {
    setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="space-y-4">
        <div className="glass-panel relative overflow-hidden p-4">
          <img
            src={gallery[activeImageIndex]}
            alt={`${product.name} view ${activeImageIndex + 1}`}
            className="h-[560px] w-full rounded-[2rem] object-cover"
          />
          {gallery.length > 1 ? (
            <>
              <button
                type="button"
                onClick={showPrevImage}
                className="absolute left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-soft transition hover:bg-white dark:bg-slate-900/90 dark:text-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-soft transition hover:bg-white dark:bg-slate-900/90 dark:text-white"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          ) : null}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {gallery.map((image, index) => (
            <button
              key={`${product.id}-${index}`}
              type="button"
              onClick={() => setActiveImageIndex(index)}
              className={[
                "glass-panel overflow-hidden border-2 p-2 transition",
                activeImageIndex === index
                  ? "border-brand-500"
                  : "border-transparent hover:border-slate-300 dark:hover:border-slate-700",
              ].join(" ")}
            >
              <img
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="h-28 w-full rounded-2xl object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel space-y-6 p-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            {product.category}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">{product.name}</h1>
          <p className="inline-flex items-center gap-2 text-sm text-slate-500">
            <Star size={16} className="fill-current text-amber-400" />
            {product.rating} rating
          </p>
          <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
            {product.description}
          </p>
          <p className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            Carousel includes front pose, side drape, and runway-style movement so the
            saree feels closer to a real fashion product page.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-3xl font-semibold">{formatCurrency(product.price)}</span>
          <button
            type="button"
            onClick={handleWishlist}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition",
              isWishlisted
                ? "bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-200"
                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
            ].join(" ")}
          >
            <span className="inline-flex items-center gap-2">
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
              Wishlist
            </span>
          </button>
        </div>

        {cartItem ? (
          <div className="space-y-3 rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Quantity in bag
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                className="rounded-full border border-slate-200 p-2 dark:border-slate-700"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-10 text-center text-lg font-semibold">
                {cartItem.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                className="rounded-full border border-slate-200 p-2 dark:border-slate-700"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ) : null}

        <button type="button" onClick={handleAdd} className="btn-primary w-full">
          <span className="inline-flex items-center gap-2">
            <ShoppingCart size={18} />
            {isAuthenticated ? "Add to bag" : "Login to add to bag"}
          </span>
        </button>
      </div>
    </div>
  );
}
