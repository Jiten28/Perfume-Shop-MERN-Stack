import Logo from "./Logo";

export default function MarginMarks() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden min-[1400px]:block" aria-hidden="true">
      <Logo className="absolute left-7 top-1/2 h-9 w-9 -translate-y-1/2 text-ink opacity-[0.06]" />
      <p className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.42em] text-ink opacity-[0.1]">
        Perfume Store
      </p>
    </div>
  );
}
