import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="glass-panel space-y-4 p-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
        404
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-slate-600 dark:text-slate-300">
        This route is not defined in the current demo app.
      </p>
      <Link to="/" className="btn-primary">
        Return home
      </Link>
    </div>
  );
}
