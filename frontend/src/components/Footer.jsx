import { Link } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
  { to: "/contact", label: "Contact" },
  { to: "/cart", label: "Cart" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gold bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-ink">
            <Logo className="h-8 w-8" />
            <span className="font-serif text-3xl leading-none">Perfume Store</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
            A short edit of houses, chosen for character rather than noise.
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-stone">Visit</p>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm hover:text-stone">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-stone">Atelier</p>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            Questions and gift notes welcome.
          </p>
          <a
            href="mailto:work.jiten282003@gmail.com"
            className="mt-3 inline-block border-b border-gold pb-0.5 text-sm"
          >
            work.jiten282003@gmail.com
          </a>
        </div>
      </div>
      <div className="border-t border-line px-6 py-4 text-center text-xs tracking-wide text-stone">
        © {new Date().getFullYear()} Jiten Kumar. All rights reserved.
      </div>
    </footer>
  );
}
