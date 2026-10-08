export default function Logo({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <path d="M19 6h10v3.2H19z" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M17.5 9.2h13V13c0 .9-.7 1.6-1.6 1.6h-9.8c-.9 0-1.6-.7-1.6-1.6V9.2z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect x="11" y="16.4" width="26" height="25" rx="1.4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M11 27.5h26" stroke="#A68456" strokeWidth="1.1" />
    </svg>
  );
}
