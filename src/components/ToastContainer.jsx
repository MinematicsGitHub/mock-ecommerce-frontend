const TOAST_STYLES = {
  info: "border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-900/60 dark:bg-sky-950/80 dark:text-sky-100",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/80 dark:text-emerald-100",
  error:
    "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/80 dark:text-rose-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/80 dark:text-amber-100",
};

function getToastStyle(type) {
  return TOAST_STYLES[type] ?? TOAST_STYLES.info;
}

export default function ToastContainer({ toasts }) {
  if (!toasts?.length) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-3 px-4 sm:items-end">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={[
            "w-full max-w-sm rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-sm transition-all",
            getToastStyle(toast.type),
          ].join(" ")}
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
