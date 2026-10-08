import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useCart } from "../pages/CartContext";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/collections", label: "Collections" },
  { to: "/contact", label: "Contact" },
];

function itemClass({ isActive }) {
  return `w-fit text-[12px] uppercase tracking-[0.18em] transition ${
    isActive ? "text-ink shadow-[inset_0_-1px_0_0_#A68456]" : "text-stone hover:text-ink"
  }`;
}

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 text-ink">
          <Logo className="h-8 w-8" />
          <span className="font-serif text-[1.7rem] leading-none tracking-wide">Perfume Store</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={itemClass}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/cart" className={itemClass}>
            Cart
            {count > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center bg-ink px-1 text-[10px] tracking-normal text-ivory">
                {count}
              </span>
            )}
          </NavLink>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative text-[12px] uppercase tracking-[0.18em]" aria-label="Cart">
            Cart
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center bg-ink px-1 text-[10px] text-ivory">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span className={`h-px w-full bg-ink transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-ink transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t border-line bg-paper px-6 py-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-4 pb-3">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={itemClass}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
