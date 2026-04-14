import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = register(formData);

    if (!result.ok) {
      showToast(result.message, "error");
      return;
    }

    showToast(`Account created for ${result.user.fullName}.`, "success");
    navigate("/account", { replace: true });
  };

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="glass-panel space-y-5 p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Create your style account</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Save your favorite sarees, build your bag, and return to the latest drops any time.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium">Full name</span>
          <input
            className="input-field"
            type="text"
            value={formData.fullName}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, fullName: event.target.value }))
            }
            required
          />
        </label>

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
          Create account
        </button>

        <p className="text-sm text-slate-600 dark:text-slate-300">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
