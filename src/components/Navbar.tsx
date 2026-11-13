import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  labels: {
    destinations: string;
    packages: string;
    routes: string;
    contact: string;
    cta: string;
  };
}

export function Navbar({ labels }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#destinations', label: labels.destinations },
    { href: '#packages', label: labels.packages },
    { href: '#routes', label: labels.routes },
    { href: '#contact', label: labels.contact },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#e5e3dc] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between gap-8 px-5 sm:h-[72px]">
        <a
          href="#home"
          className="shrink-0 whitespace-nowrap font-serif text-base font-bold tracking-[0.04em] text-[#173f35] transition-colors hover:text-[#24594b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173f35] sm:text-lg"
        >
          DEK ARMY TOUR N TREVEL
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap border-b border-transparent py-1 text-[13px] font-semibold text-[#1e2925] transition-colors duration-150 hover:border-[#d8b77a] hover:text-[#173f35] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173f35]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#contact"
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded bg-[#173f35] px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-150 hover:bg-[#24594b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f35] sm:inline-flex"
          >
            <span>{labels.cta}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded text-[#173f35] transition-colors hover:bg-[#f6f3ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f35] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#e5e3dc] bg-white px-5 py-4 shadow-lg md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded px-3 text-sm font-semibold text-[#1e2925] hover:bg-[#f6f3ec] hover:text-[#173f35]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded bg-[#173f35] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#24594b]"
            >
              <span>{labels.cta}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
