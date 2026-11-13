import { useEffect } from 'react';
import { ArrowUpRight, MapPin, X } from 'lucide-react';
import { COPY, Lang, TourPackage } from '../data/baliData';
import { ImageWithFallback } from './ImageWithFallback';

interface PackageModalProps {
  pkg: TourPackage | null;
  lang: Lang;
  onClose: () => void;
  onRequestQuote: (packageName: string) => void;
}

export function PackageModal({ pkg, lang, onClose, onRequestQuote }: PackageModalProps) {
  const t = COPY[lang].modal;

  useEffect(() => {
    if (!pkg) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [pkg, onClose]);

  if (!pkg) return null;

  const googleMapsDirUrl = (() => {
    let url =
      'https://www.google.com/maps/dir/?api=1&origin=' +
      encodeURIComponent(pkg.origin) +
      '&destination=' +
      encodeURIComponent(pkg.destination);
    if (pkg.waypoints.length > 0) {
      url += '&waypoints=' + encodeURIComponent(pkg.waypoints.join('|'));
    }
    return url;
  })();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-package-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#081813]/75 p-4 backdrop-blur-xs sm:p-6"
    >
      <div className="relative mx-auto my-6 max-w-[820px] overflow-hidden rounded-md bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close package details"
          className="absolute top-3.5 right-3.5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#173f35] shadow-sm transition-colors hover:bg-[#f6f3ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f35]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-52 w-full sm:h-72">
          <ImageWithFallback
            src={pkg.img}
            alt={pkg.name}
            fallbackLabel={pkg.name}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#091b16]/60 via-transparent to-transparent" />
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#9a7842] uppercase">
            <span>{pkg.type}</span>
            <span aria-hidden="true">·</span>
            <span>{pkg.regionLabel[lang]}</span>
            <span aria-hidden="true">·</span>
            <span>{pkg.estimatedWindow[lang]}</span>
          </div>

          <h2
            id="modal-package-title"
            className="font-serif text-3xl font-bold text-[#173f35] sm:text-4xl"
          >
            {pkg.name}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#68746e]">
            {pkg.desc[lang]}
          </p>

          <div className="mt-6 grid gap-6 border-t border-[#e5e3dc] pt-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold text-[#173f35]">{t.routeTitle}</h3>
              <ol className="mt-3 space-y-2.5">
                {pkg.route[lang].map((step, idx) => (
                  <li key={step} className="flex items-start gap-2.5 text-[13px] text-[#1e2925]">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#d8b77a] text-[11px] font-semibold text-[#9a7842] tabular-nums">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#173f35]">{t.infoTitle}</h3>
              <ul className="mt-3 space-y-2">
                {t.infoItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[13px] text-[#68746e]"
                  >
                    <span className="font-bold text-[#9a7842]" aria-hidden="true">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded bg-[#f6f3ec] px-4 py-3 text-xs leading-relaxed text-[#1e2925]">
            <strong className="font-bold text-[#173f35]">{t.priceTitle}</strong>{' '}
            {t.priceBody}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={googleMapsDirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded bg-[#173f35] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#24594b]"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>{t.openMap}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => onRequestQuote(pkg.name)}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded bg-[#d8b77a] px-5 py-2.5 text-[13px] font-bold text-[#173f35] transition-colors hover:bg-[#cfa964]"
            >
              <span>{t.askQuote}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
