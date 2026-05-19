import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import filaNeon from "@/assets/fila-neon-logo.png";

const links = [
  { label: "Evento", href: "#evento" },
  { label: "After Run", href: "#after" },
  { label: "Inscripción", href: "#inscripcion" },
  { label: "Productos", href: "#productos" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[var(--slate-black)]/85 backdrop-blur-md py-3"
          : "bg-transparent py-6"
      )}
    >
      <nav className="mx-auto flex max-w-[1680px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-center" aria-label="FILA">
          <img
            src={filaNeon}
            alt="FILA"
            className="h-9 w-9 md:h-10 md:w-10 object-contain"
          />
        </a>
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="label-tech text-heritage/80 hover:text-heritage transition-colors relative group text-[1.1rem]"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--fila-red)] transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <a href="#inscripcion" className="cta-pill cta-pill-red text-[10px] py-2.5 px-5">
          Inscríbete
        </a>
      </nav>
    </header>
  );
}

export function FilaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <rect x="3" y="3" width="94" height="94" stroke="currentColor" strokeWidth="6" />
      <rect x="22" y="26" width="56" height="14" rx="7" fill="currentColor" />
      <path
        d="M22 52 h56 a7 7 0 0 1 0 14 H36 v15 a7 7 0 0 1 -14 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}
