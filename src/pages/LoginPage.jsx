import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const from = location.state?.from?.pathname || "/account";

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(formData);

    if (!result.ok) {
      showToast(result.message, "error");
      return;
    }

    showToast(`Welcome back, ${result.user.fullName}.`, "success");
    navigate(from, { replace: true });
  };

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="glass-panel space-y-5 p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Login to continue shopping</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Save your saree shortlist, review your bag, and continue to UPI or card payment.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium">Email</span>
          <input
            className="input-field"
            type="email"
            value={formData.email}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, email: event.target.value }))
            }
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium">Password</span>
          <input
            className="input-field"
            type="password"
            value={formData.password}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, password: event.target.value }))
            }
            required
          />
        </label>

        <button type="submit" className="btn-primary w-full">
          Sign in
        </button>

        <p className="text-sm text-slate-600 dark:text-slate-300">
          New here?{" "}
          <Link to="/register" className="font-semibold text-brand-600">
            Create your account
          </Link>
        </p>
      </form>
    </div>
  );
}
