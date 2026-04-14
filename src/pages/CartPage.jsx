import { useMemo, useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  Smartphone,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatCurrency } from "../utils/currency";

export default function CartPage() {
  const { currentUser, isAuthenticated } = useAuth();
  const { cartItems, clearCart, removeFromCart, shipping, subtotal, total, updateQuantity } =
    useCart();
  const { showToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("phonepe");
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const tax = Math.round(subtotal * 0.08);
  const payableTotal = total + tax;

  const paymentOptions = useMemo(
    () => [
      {
        id: "phonepe",
        label: "PhonePe",
        description: "Pay with UPI ID or the phone linked to your PhonePe account.",
      },
      {
        id: "gpay",
        label: "Google Pay",
        description: "Use GPay UPI for a familiar mobile-first checkout flow.",
      },
      {
        id: "card",
        label: "Card",
        description: "Securely enter debit or credit card details for this demo checkout.",
      },
    ],
    []
  );

  const updatePaymentDetails = (field, value) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "card") {
      if (
        !paymentDetails.cardName ||
        paymentDetails.cardNumber.replace(/\s/g, "").length < 12 ||
        !paymentDetails.expiry ||
        paymentDetails.cvv.length < 3
      ) {
        showToast("Enter complete card details to continue.", "error");
        return;
      }
    }

    if (paymentMethod !== "card" && !paymentDetails.upiId && !paymentDetails.phone) {
      showToast("Enter a UPI ID or phone number to continue.", "error");
      return;
    }

    clearCart();
    setPaymentDetails({
      upiId: "",
      phone: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
    showToast(`Payment successful. Order confirmed for ${currentUser.fullName}.`, "success");
  };

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel overflow-hidden">
          <div className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div className="space-y-5">
              <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
                Secure checkout
              </span>
              <h1 className="text-4xl font-semibold tracking-tight">
                Login before you build your saree bag.
              </h1>
              <p className="max-w-xl text-base text-slate-600 dark:text-slate-300">
                Aurelia Sarees keeps your shortlist and bag tied to the signed-in user,
                so your drapes, checkout choices, and payment flow stay personal.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/login" className="btn-primary">
                  Login to continue
                </Link>
                <Link to="/register" className="btn-secondary">
                  Create account
                </Link>
              </div>
            </div>
            <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-brand-700 to-brand-500 p-6 text-white shadow-soft">
              <div className="space-y-4">
                <p className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
                  <ShieldCheck size={16} />
                  Checkout features
                </p>
                <div className="space-y-3">
                  <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                    <p className="font-semibold">User-linked cart</p>
                    <p className="mt-1 text-sm text-white/80">
                      Items stay scoped to the logged-in profile.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                    <p className="font-semibold">UPI and card UI</p>
                    <p className="mt-1 text-sm text-white/80">
                      PhonePe, Google Pay, and card payment sections are available after login.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="glass-panel space-y-4 p-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Your bag is empty</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Add a saree or two to start building your look.
        </p>
        <Link to="/" className="btn-primary">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
      <section className="space-y-4">
        <div className="glass-panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              Signed-in checkout
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Bag review</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Reviewing sarees for {currentUser.fullName}. Complete payment on the right.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm dark:bg-slate-900">
            <p className="font-medium">Delivery window</p>
            <p className="text-slate-500">Estimated in 2-4 business days</p>
          </div>
        </div>

        {cartItems.map((item) => (
          <article
            key={item.id}
            className="glass-panel grid gap-4 p-5 sm:grid-cols-[120px_1fr_auto]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-28 w-full rounded-2xl object-cover"
            />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {item.category}
              </p>
              <h2 className="text-xl font-semibold tracking-tight">{item.name}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {formatCurrency(item.price)} each
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 sm:items-end">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 px-2 py-1 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="rounded-full p-1"
                >
                  <Minus size={16} />
                </button>
                <span className="min-w-8 text-center text-sm font-semibold">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="rounded-full p-1"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-lg font-semibold">
                {formatCurrency(item.price * item.quantity)}
              </p>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="inline-flex items-center gap-2 text-sm font-medium text-rose-600"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </article>
        ))}
      </section>

      <aside className="space-y-6">
        <div className="glass-panel h-fit space-y-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Summary</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Secure checkout is enabled for your account.
              </p>
            </div>
            <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-200">
              Verified
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax estimate</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-950 dark:border-slate-800 dark:text-white">
              <span>Total</span>
              <span>{formatCurrency(payableTotal)}</span>
            </div>
          </div>
        </div>

        <div className="glass-panel h-fit space-y-5 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-brand-100 p-2 text-brand-700 dark:bg-brand-950/60 dark:text-brand-100">
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Payment</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Production-style payment UI for a polished saree checkout experience.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {paymentOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setPaymentMethod(option.id)}
                className={[
                  "rounded-3xl border p-4 text-left transition",
                  paymentMethod === option.id
                    ? "border-brand-500 bg-brand-50 shadow-soft dark:border-brand-500 dark:bg-brand-950/40"
                    : "border-slate-200 bg-white/80 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-slate-100 p-2 dark:bg-slate-800">
                    {option.id === "card" ? <CreditCard size={18} /> : <Smartphone size={18} />}
                  </div>
                  <div>
                    <p className="font-semibold">{option.label}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {paymentMethod === "card" ? (
            <div className="grid gap-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium">Name on card</span>
                <input
                  className="input-field"
                  type="text"
                  value={paymentDetails.cardName}
                  onChange={(event) => updatePaymentDetails("cardName", event.target.value)}
                  placeholder="Aanya Mehra"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium">Card number</span>
                <input
                  className="input-field"
                  type="text"
                  inputMode="numeric"
                  value={paymentDetails.cardNumber}
                  onChange={(event) => updatePaymentDetails("cardNumber", event.target.value)}
                  placeholder="4111 1111 1111 1111"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium">Expiry</span>
                  <input
                    className="input-field"
                    type="text"
                    value={paymentDetails.expiry}
                    onChange={(event) => updatePaymentDetails("expiry", event.target.value)}
                    placeholder="08/28"
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium">CVV</span>
                  <input
                    className="input-field"
                    type="password"
                    inputMode="numeric"
                    value={paymentDetails.cvv}
                    onChange={(event) => updatePaymentDetails("cvv", event.target.value)}
                    placeholder="123"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium">
                  {paymentMethod === "phonepe" ? "PhonePe UPI ID" : "Google Pay UPI ID"}
                </span>
                <input
                  className="input-field"
                  type="text"
                  value={paymentDetails.upiId}
                  onChange={(event) => updatePaymentDetails("upiId", event.target.value)}
                  placeholder="name@oksbi"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium">Registered phone number</span>
                <input
                  className="input-field"
                  type="tel"
                  inputMode="numeric"
                  value={paymentDetails.phone}
                  onChange={(event) => updatePaymentDetails("phone", event.target.value)}
                  placeholder="+91 98765 43210"
                />
              </label>
            </div>
          )}

          <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <p className="inline-flex items-center gap-2 font-medium text-slate-900 dark:text-white">
              <CheckCircle2 size={16} />
              Payment options supported
            </p>
            <p className="mt-2">PhonePe, Google Pay, Visa, Mastercard, and RuPay UI included.</p>
          </div>

          <button type="button" onClick={handlePlaceOrder} className="btn-primary w-full">
            Pay {formatCurrency(payableTotal)}
          </button>
        </div>
      </aside>
    </div>
  );
}
