import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  const showToast = useCallback((next) => {
    setToast(typeof next === "string" ? { text: next } : next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
          <div
            role="status"
            className="pointer-events-auto flex items-center gap-5 border border-line bg-paper px-5 py-3 text-sm shadow-[0_16px_40px_rgba(26,23,20,0.08)]"
          >
            <span>{toast.text}</span>
            {toast.href && (
              <Link
                to={toast.href}
                onClick={() => setToast(null)}
                className="border-b border-gold pb-0.5 text-[11px] uppercase tracking-[0.18em]"
              >
                {toast.hrefLabel || "View"}
              </Link>
            )}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const showToast = useContext(ToastContext);
  if (!showToast) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return showToast;
}
