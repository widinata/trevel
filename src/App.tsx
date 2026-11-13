import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Compass,
  Copy,
  MapPin,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import {
  BRAND_NAME,
  CONTACT_PHONE_DISPLAY,
  CONTACT_WHATSAPP_NUMBER,
  COPY,
  FEATURE_IMAGE,
  HERO_IMAGE,
  Lang,
  PACKAGES,
  PackageDuration,
  REGIONS,
  RegionKey,
  TourPackage,
} from './data/baliData';
import { ImageWithFallback } from './components/ImageWithFallback';
import { Navbar } from './components/Navbar';
import { PackageModal } from './components/PackageModal';

type DurationFilter = 'All' | PackageDuration;

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [selectedRegion, setSelectedRegion] = useState<RegionKey | null>(null);
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('All');
  const [activePackage, setActivePackage] = useState<TourPackage | null>(null);
  const [previewPackage, setPreviewPackage] = useState<TourPackage | null>(null);

  // Inquiry form state
  const [guestName, setGuestName] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [guestCount, setGuestCount] = useState('1–2 guests');
  const [interest, setInterest] = useState("I'm still exploring");
  const [guestMessage, setGuestMessage] = useState('');
  const [preparedMessage, setPreparedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const t = COPY[lang];

  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      const matchesDuration = durationFilter === 'All' || pkg.type === durationFilter;
      const matchesRegion = selectedRegion === null || pkg.region === selectedRegion;
      return matchesDuration && matchesRegion;
    });
  }, [durationFilter, selectedRegion]);

  const activeRegionInfo = useMemo(
    () => REGIONS.find((r) => r.key === selectedRegion) ?? null,
    [selectedRegion]
  );

  // Determine what the embedded Google Maps frame displays
  const mapEmbedUrl = useMemo(() => {
    if (previewPackage) {
      return (
        'https://maps.google.com/maps?q=' +
        encodeURIComponent(`${previewPackage.origin} to ${previewPackage.destination}`) +
        '&output=embed'
      );
    }
    if (activeRegionInfo) {
      return (
        'https://maps.google.com/maps?q=' +
        encodeURIComponent(activeRegionInfo.mapQuery) +
        '&z=11&output=embed'
      );
    }
    return 'https://maps.google.com/maps?q=Bali%2C%20Indonesia&z=9&output=embed';
  }, [previewPackage, activeRegionInfo]);

  const externalMapUrl = useMemo(() => {
    if (previewPackage) {
      let url =
        'https://www.google.com/maps/dir/?api=1&origin=' +
        encodeURIComponent(previewPackage.origin) +
        '&destination=' +
        encodeURIComponent(previewPackage.destination);
      if (previewPackage.waypoints.length > 0) {
        url += '&waypoints=' + encodeURIComponent(previewPackage.waypoints.join('|'));
      }
      return url;
    }
    if (activeRegionInfo) {
      return (
        'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(activeRegionInfo.mapQuery)
      );
    }
    return 'https://www.google.com/maps/search/?api=1&query=Bali%2C+Indonesia';
  }, [previewPackage, activeRegionInfo]);

  const handleSelectRegion = (regionKey: RegionKey) => {
    setSelectedRegion((prev) => (prev === regionKey ? null : regionKey));
    setPreviewPackage(null);
  };

  const handleOpenPackage = (pkg: TourPackage) => {
    setActivePackage(pkg);
    setPreviewPackage(pkg);
  };

  const handlePreviewRouteOnly = (pkg: TourPackage) => {
    setPreviewPackage(pkg);
    const routesEl = document.getElementById('routes');
    routesEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRequestQuote = (packageName: string) => {
    setActivePackage(null);
    setInterest(packageName);
    setPreparedMessage(null);
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = guestName.trim();
    if (!trimmedName) return;

    const formattedDate = travelDate || (lang === 'id' ? 'Belum ditentukan' : 'Flexible / Not decided');
    const noteText = guestMessage.trim() || (lang === 'id' ? '-' : 'None');

    const msg =
      lang === 'id'
        ? `Halo ${BRAND_NAME}! Saya ingin menanyakan paket perjalanan Bali.\nNama: ${trimmedName}\nTanggal perjalanan: ${formattedDate}\nJumlah tamu: ${guestCount}\nMinat paket: ${interest}\nCatatan: ${noteText}\nMohon informasi detail dan penawaran harga terbaru.`
        : `Hello ${BRAND_NAME}! I would like to ask about a Bali trip.\nName: ${trimmedName}\nTravel date: ${formattedDate}\nGuests: ${guestCount}\nInterested in: ${interest}\nMessage: ${noteText}\nPlease share the latest quotation and details.`;

    setPreparedMessage(msg);
    setCopied(false);
  };

  const handleCopyMessage = async () => {
    if (!preparedMessage) return;
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const whatsappHref = preparedMessage
    ? `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(preparedMessage)}`
    : `https://wa.me/${CONTACT_WHATSAPP_NUMBER}`;

  return (
    <div className="min-h-screen bg-white text-[#1e2925]">
      <Navbar labels={t.nav} />

      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          className="relative flex min-h-[600px] items-center overflow-hidden bg-[#0f2b24] text-white"
        >
          <ImageWithFallback
            src={HERO_IMAGE}
            alt="Tegalalang rice terraces in Ubud Bali at morning light"
            fallbackLabel={`Bali Island · ${BRAND_NAME}`}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#091e19]/90 via-[#091e19]/65 to-[#091e19]/25"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1160px] px-5 py-20 sm:py-24">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#d8b77a] uppercase">
                {t.hero.eyebrow}
              </p>

              {/* Functional Language Switcher (outside Top Bar Contract) */}
              <div
                role="group"
                aria-label="Language switcher"
                className="inline-flex items-center rounded bg-black/35 p-1 backdrop-blur-xs"
              >
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`min-h-[32px] whitespace-nowrap rounded px-3 text-xs font-semibold transition-colors ${
                    lang === 'en'
                      ? 'bg-[#d8b77a] text-[#173f35]'
                      : 'text-[#e8eee9] hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang('id')}
                  className={`min-h-[32px] whitespace-nowrap rounded px-3 text-xs font-semibold transition-colors ${
                    lang === 'id'
                      ? 'bg-[#d8b77a] text-[#173f35]'
                      : 'text-[#e8eee9] hover:text-white'
                  }`}
                >
                  ID
                </button>
              </div>
            </div>

            <div className="max-w-[660px]">
              <h1 className="headline-balance font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] font-bold text-white">
                {t.hero.titleLine1}
                <br />
                {t.hero.titleLine2}
                <br />
                {t.hero.titleLine3}
              </h1>
              <p className="mt-5 max-w-[530px] text-base leading-relaxed text-[#e8eee9] sm:text-[17px]">
                {t.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#packages"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded bg-[#d8b77a] px-6 py-3 text-[13px] font-bold text-[#173f35] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#cfa964] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b77a]"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#destinations"
                  className="inline-flex min-h-[46px] items-center justify-center whitespace-nowrap rounded border border-white/70 bg-transparent px-6 py-3 text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#e6e9e5]">
                {t.hero.notes.map((note, idx) => (
                  <span key={note} className="inline-flex items-center gap-2">
                    {idx > 0 && (
                      <span aria-hidden="true" className="text-[#d8b77a]">
                        ·
                      </span>
                    )}
                    <span>{note}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VALUE STRIP */}
        <div className="border-b border-[#e5e3dc] bg-[#f6f3ec] py-7">
          <div className="mx-auto grid max-w-[1160px] gap-6 px-5 md:grid-cols-3 md:gap-8">
            {t.strip.map((item, idx) => {
              const Icon = idx === 0 ? Compass : idx === 1 ? MapPin : MessageCircle;
              return (
                <div key={item.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d9d2c4] bg-white/70 text-[#173f35]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-[13px] font-bold text-[#173f35]">{item.title}</h2>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#68746e]">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DESTINATIONS BY REGION */}
        <section id="destinations" className="py-20 sm:py-24">
          <div className="mx-auto max-w-[1160px] px-5">
            <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-2.5 text-[11px] font-bold tracking-[0.18em] text-[#9a7842] uppercase">
                  {t.destinations.kicker}
                </p>
                <h2 className="headline-balance font-serif text-[clamp(2rem,4vw,3rem)] leading-tight font-bold text-[#173f35]">
                  {t.destinations.title}
                </h2>
              </div>
              <div className="max-w-[460px]">
                <p className="text-sm leading-relaxed text-[#68746e]">{t.destinations.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
              {REGIONS.map((region) => {
                const isSelected = selectedRegion === region.key;
                return (
                  <button
                    key={region.key}
                    type="button"
                    onClick={() => handleSelectRegion(region.key)}
                    aria-pressed={isSelected}
                    className={`group relative h-[250px] overflow-hidden rounded text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173f35] sm:h-[300px] ${
                      isSelected
                        ? 'ring-2 ring-[#173f35] ring-offset-2'
                        : 'hover:-translate-y-0.5'
                    }`}
                  >
                    <ImageWithFallback
                      src={region.img}
                      alt={region.alt[lang]}
                      fallbackLabel={region.name[lang]}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#091b16]/85 via-[#091b16]/25 to-transparent"
                    />
                    <div className="absolute inset-x-4 bottom-4 z-10">
                      <span className="block text-[10px] font-bold tracking-[0.16em] text-[#d8b77a] uppercase">
                        {region.index} · {region.subtitle[lang]}
                      </span>
                      <h3 className="mt-1 font-serif text-[21px] font-bold text-white">
                        {region.name[lang]}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#e2eae5]">
                        {region.highlights[lang]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {activeRegionInfo && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e3dc] pt-4 text-xs text-[#1e2925]">
                <span>
                  {t.destinations.selectedHint}{' '}
                  <strong className="font-bold text-[#173f35]">
                    {activeRegionInfo.name[lang]}
                  </strong>{' '}
                  — {activeRegionInfo.highlights[lang]}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedRegion(null)}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#173f35] underline decoration-[#d8b77a] underline-offset-4 hover:text-[#24594b]"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.destinations.clearFilter}</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* TOUR PACKAGES */}
        <section id="packages" className="bg-[#f6f3ec] py-20 sm:py-24">
          <div className="mx-auto max-w-[1160px] px-5">
            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-2.5 text-[11px] font-bold tracking-[0.18em] text-[#9a7842] uppercase">
                  {t.packages.kicker}
                </p>
                <h2 className="headline-balance font-serif text-[clamp(2rem,4vw,3rem)] leading-tight font-bold text-[#173f35]">
                  {t.packages.title}
                </h2>
              </div>
              <p className="max-w-[460px] text-sm leading-relaxed text-[#68746e]">
                {t.packages.subtitle}
              </p>
            </div>

            {/* Interactive Duration & Region Filter Bar */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e3dc] pb-5">
              <div
                role="tablist"
                aria-label="Filter tour duration"
                className="inline-flex flex-wrap items-center gap-1.5 rounded bg-white p-1 shadow-xs"
              >
                {(
                  [
                    { key: 'All', label: `${t.packages.filters.all} (${PACKAGES.length})` },
                    {
                      key: 'Full Day',
                      label: `${t.packages.filters.full} (${PACKAGES.filter((p) => p.type === 'Full Day').length})`,
                    },
                    {
                      key: 'Half Day',
                      label: `${t.packages.filters.half} (${PACKAGES.filter((p) => p.type === 'Half Day').length})`,
                    },
                  ] as const
                ).map((tab) => {
                  const active = durationFilter === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setDurationFilter(tab.key)}
                      className={`min-h-[38px] whitespace-nowrap rounded px-4 text-xs font-semibold transition-colors ${
                        active
                          ? 'bg-[#173f35] text-white'
                          : 'text-[#68746e] hover:bg-[#f6f3ec] hover:text-[#173f35]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {selectedRegion && (
                <button
                  type="button"
                  onClick={() => setSelectedRegion(null)}
                  className="inline-flex min-h-[38px] items-center gap-1.5 whitespace-nowrap rounded border border-[#d9d2c4] bg-white px-3.5 text-xs font-semibold text-[#173f35] transition-colors hover:bg-[#edf2ed]"
                >
                  <span>{activeRegionInfo?.name[lang]}</span>
                  <span aria-hidden="true">×</span>
                </button>
              )}
            </div>

            {filteredPackages.length === 0 ? (
              <div className="rounded border border-[#e5e3dc] bg-white p-10 text-center">
                <p className="text-sm text-[#68746e]">{t.packages.empty}</p>
                <button
                  type="button"
                  onClick={() => {
                    setDurationFilter('All');
                    setSelectedRegion(null);
                  }}
                  className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded bg-[#173f35] px-4 py-2 text-xs font-semibold text-white hover:bg-[#24594b]"
                >
                  {t.packages.resetFilters}
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPackages.map((pkg) => (
                  <article
                    key={pkg.id}
                    className="flex flex-col overflow-hidden rounded bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div className="relative h-52 w-full overflow-hidden">
                      <ImageWithFallback
                        src={pkg.img}
                        alt={pkg.name}
                        fallbackLabel={pkg.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] text-[#9a7842] uppercase">
                        <span>{pkg.type}</span>
                        <span aria-hidden="true">·</span>
                        <span>{pkg.regionLabel[lang]}</span>
                      </div>

                      <h3 className="font-serif text-[22px] leading-snug font-bold text-[#173f35]">
                        {pkg.name}
                      </h3>

                      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#68746e]">
                        {pkg.desc[lang]}
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#e5e3dc] pt-3.5 text-xs">
                        <button
                          type="button"
                          onClick={() => handlePreviewRouteOnly(pkg)}
                          className="inline-flex min-h-[36px] items-center gap-1 whitespace-nowrap font-medium text-[#68746e] transition-colors hover:text-[#173f35]"
                        >
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{t.packages.mapAction}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenPackage(pkg)}
                          className="inline-flex min-h-[36px] items-center gap-1 whitespace-nowrap font-bold text-[#173f35] transition-colors hover:text-[#24594b]"
                        >
                          <span>{t.packages.cardAction}</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FEATURE SPLIT: YOUR TRIP, YOUR PACE */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-[1160px] items-stretch gap-10 px-5 lg:grid-cols-2 lg:gap-16">
            <div className="relative min-h-[340px] lg:min-h-[480px]">
              <div className="h-full w-full overflow-hidden rounded lg:w-[88%]">
                <ImageWithFallback
                  src={FEATURE_IMAGE}
                  alt="Mount Batur and caldera lake panorama in Kintamani Bali"
                  fallbackLabel="Bali Private Journeys"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute right-0 bottom-6 hidden rounded-xs bg-[#d8b77a] px-6 py-4 font-serif text-xl font-bold tracking-[0.22em] text-[#173f35] shadow-md sm:block"
              >
                BALI
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-2.5 text-[11px] font-bold tracking-[0.18em] text-[#9a7842] uppercase">
                {t.feature.kicker}
              </p>
              <h2 className="headline-balance font-serif text-[clamp(2rem,4vw,3rem)] leading-tight font-bold text-[#173f35]">
                {t.feature.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#68746e]">
                {t.feature.body}
              </p>

              <ul className="my-6 divide-y divide-[#e5e3dc] border-y border-[#e5e3dc]">
                {t.feature.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3 text-[13px] text-[#1e2925]"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#9a7842]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div>
                <a
                  href="#contact"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded bg-[#173f35] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#24594b]"
                >
                  <span>{t.feature.cta}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE ROUTE BAND */}
        <section id="routes" className="bg-[#173f35] py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="mb-2.5 text-[11px] font-bold tracking-[0.18em] text-[#d8b77a] uppercase">
                {t.routes.kicker}
              </p>
              <h2 className="headline-balance whitespace-pre-line font-serif text-[clamp(2rem,4vw,3rem)] leading-tight font-bold text-white">
                {t.routes.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#d5e0d9]">
                {t.routes.subtitle}
              </p>

              <div className="mt-5 rounded border border-white/15 bg-white/5 px-4 py-3 text-xs">
                <span className="block text-[10px] font-bold tracking-[0.14em] text-[#d8b77a] uppercase">
                  {t.routes.activeRouteLabel}
                </span>
                <span className="mt-0.5 block font-serif text-base font-semibold text-white">
                  {previewPackage
                    ? `${previewPackage.name} (${previewPackage.origin} → ${previewPackage.destination})`
                    : activeRegionInfo
                      ? `${activeRegionInfo.name[lang]} · ${activeRegionInfo.highlights[lang]}`
                      : t.routes.defaultRouteLabel}
                </span>
              </div>

              <div className="my-6 space-y-4">
                {t.routes.steps.map((step, idx) => (
                  <div key={step.title} className="flex items-start gap-3.5">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d8b77a] text-xs font-semibold text-[#d8b77a] tabular-nums">
                      {idx + 1}
                    </span>
                    <div>
                      <strong className="block text-sm font-semibold text-white">
                        {step.title}
                      </strong>
                      <small className="text-xs text-[#c1d0c7]">{step.desc}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={externalMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded bg-[#d8b77a] px-5 py-2.5 text-[13px] font-bold text-[#173f35] transition-colors hover:bg-[#cfa964]"
                >
                  <span>{t.routes.cta}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#packages"
                  className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded border border-white/50 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {t.routes.browseCta}
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="h-[320px] overflow-hidden rounded bg-[#e8e6db] shadow-lg sm:h-[400px]">
                <iframe
                  title="Bali Tour Route Map"
                  loading="lazy"
                  src={mapEmbedUrl}
                  className="h-full w-full border-0 saturate-[0.8]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* BRAND PROMISE */}
        <section className="bg-white py-20 text-center sm:py-24">
          <div className="mx-auto max-w-[820px] px-5">
            <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-[#9a7842] uppercase">
              {t.promise.kicker}
            </p>
            <blockquote className="headline-balance font-serif text-2xl leading-snug font-semibold text-[#173f35] sm:text-[30px]">
              {t.promise.quote}
            </blockquote>
            <p className="mt-4 text-xs text-[#68746e]">{t.promise.attribution}</p>
          </div>
        </section>

        {/* CONTACT & WHATSAPP INQUIRY */}
        <section id="contact" className="bg-[#f6f3ec] py-20 sm:py-24">
          <div className="mx-auto max-w-[1160px] px-5">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-2.5 text-[11px] font-bold tracking-[0.18em] text-[#9a7842] uppercase">
                  {t.contact.kicker}
                </p>
                <h2 className="headline-balance font-serif text-[clamp(2rem,4vw,3rem)] leading-tight font-bold text-[#173f35]">
                  {t.contact.title}
                </h2>
              </div>
              <p className="max-w-[460px] text-sm leading-relaxed text-[#68746e]">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="rounded bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:p-8">
                <h3 className="font-serif text-2xl font-bold text-[#173f35]">
                  {t.contact.infoTitle}
                </h3>

                <div className="mt-4 divide-y divide-[#e5e3dc]">
                  {t.contact.rows.map((row, idx) => {
                    const Icon = idx === 0 ? MessageCircle : idx === 1 ? MapPin : Clock;
                    return (
                      <div key={row.title} className="flex items-start gap-3.5 py-4">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d9d2c4] text-[#173f35]">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <strong className="block text-[13px] font-bold text-[#1e2925]">
                            {row.title}
                          </strong>
                          {idx === 0 ? (
                            <a
                              href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#173f35] underline decoration-[#d8b77a] underline-offset-4 hover:text-[#24594b]"
                            >
                              <span>{row.desc}</span>
                              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                          ) : (
                            <small className="text-xs text-[#68746e]">{row.desc}</small>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-5 rounded bg-[#f6f3ec] p-4 text-xs leading-relaxed text-[#68746e]">
                  {t.contact.disclaimer}
                </p>
              </div>

              <div className="rounded bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:p-8">
                <h3 className="font-serif text-2xl font-bold text-[#173f35]">
                  {t.contact.formTitle}
                </h3>

                {preparedMessage ? (
                  <div className="mt-5 space-y-4">
                    <div className="rounded border border-[#d9d2c4] bg-[#f6f3ec] p-4">
                      <p className="text-xs font-bold tracking-[0.12em] text-[#173f35] uppercase">
                        {t.contact.previewTitle}
                      </p>
                      <pre className="mt-2.5 whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-[#1e2925]">
                        {preparedMessage}
                      </pre>
                    </div>

                    <p className="text-xs leading-relaxed text-[#68746e]">
                      {t.contact.previewNote}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded bg-[#173f35] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#24594b]"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        <span>{t.contact.openWaBtn}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded border border-[#d9d2c4] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#173f35] transition-colors hover:bg-[#f6f3ec]"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 text-[#173f35]" aria-hidden="true" />
                            <span>{t.contact.copiedBtn}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" aria-hidden="true" />
                            <span>{t.contact.copyBtn}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPreparedMessage(null)}
                        className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap px-3 text-xs font-semibold text-[#68746e] underline underline-offset-4 hover:text-[#173f35]"
                      >
                        {t.contact.editBtn}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="mt-4 space-y-4">
                    <div>
                      <label
                        htmlFor="guestName"
                        className="mb-1.5 block text-xs font-bold text-[#1e2925]"
                      >
                        {t.contact.labels.name}
                      </label>
                      <input
                        id="guestName"
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder={t.contact.labels.namePlaceholder}
                        className="w-full rounded border border-[#e5e3dc] bg-white px-3.5 py-2.5 text-[13px] text-[#1e2925] transition-colors focus:border-[#173f35] focus:outline-none"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="travelDate"
                          className="mb-1.5 block text-xs font-bold text-[#1e2925]"
                        >
                          {t.contact.labels.date}
                        </label>
                        <input
                          id="travelDate"
                          type="date"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          className="w-full rounded border border-[#e5e3dc] bg-white px-3.5 py-2.5 text-[13px] text-[#1e2925] transition-colors focus:border-[#173f35] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="guestCount"
                          className="mb-1.5 block text-xs font-bold text-[#1e2925]"
                        >
                          {t.contact.labels.guests}
                        </label>
                        <select
                          id="guestCount"
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          className="w-full rounded border border-[#e5e3dc] bg-white px-3.5 py-2.5 text-[13px] text-[#1e2925] transition-colors focus:border-[#173f35] focus:outline-none"
                        >
                          <option>1–2 guests</option>
                          <option>3–4 guests</option>
                          <option>5–6 guests</option>
                          <option>7+ guests</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="interest"
                        className="mb-1.5 block text-xs font-bold text-[#1e2925]"
                      >
                        {t.contact.labels.interest}
                      </label>
                      <select
                        id="interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full rounded border border-[#e5e3dc] bg-white px-3.5 py-2.5 text-[13px] text-[#1e2925] transition-colors focus:border-[#173f35] focus:outline-none"
                      >
                        <option>I'm still exploring</option>
                        {PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.name}>
                            {pkg.name} ({pkg.type})
                          </option>
                        ))}
                        <option>Private transport</option>
                        <option>Custom itinerary</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="guestMessage"
                        className="mb-1.5 block text-xs font-bold text-[#1e2925]"
                      >
                        {t.contact.labels.message}
                      </label>
                      <textarea
                        id="guestMessage"
                        rows={3}
                        value={guestMessage}
                        onChange={(e) => setGuestMessage(e.target.value)}
                        placeholder={t.contact.labels.messagePlaceholder}
                        className="w-full resize-y rounded border border-[#e5e3dc] bg-white px-3.5 py-2.5 text-[13px] text-[#1e2925] transition-colors focus:border-[#173f35] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded bg-[#173f35] px-5 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#24594b]"
                    >
                      <span>{t.contact.labels.submit}</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="bg-[#102e27] pt-12 pb-6 text-[#d4dfd8]">
        <div className="mx-auto max-w-[1160px] px-5">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="font-serif text-base font-bold tracking-[0.08em] text-white uppercase">
                {BRAND_NAME}
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-[#b9c8bf]">
                {t.footer.tagline}
                <br />
                {t.footer.sub}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-[0.14em] text-[#d8b77a] uppercase">
                {t.footer.explore}
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-[#b9c8bf]">
                <li>
                  <a href="#destinations" className="hover:text-white">
                    {t.nav.destinations}
                  </a>
                </li>
                <li>
                  <a href="#packages" className="hover:text-white">
                    {t.nav.packages}
                  </a>
                </li>
                <li>
                  <a href="#routes" className="hover:text-white">
                    {t.nav.routes}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-[0.14em] text-[#d8b77a] uppercase">
                {t.footer.touch}
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-[#b9c8bf]">
                <li>
                  <a
                    href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp {CONTACT_PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white">
                    {t.nav.contact}
                  </a>
                </li>
                <li>Bali, Indonesia</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-2 border-t border-white/15 pt-5 text-[11px] text-[#91a59a] sm:flex-row">
            <span>{t.footer.copyright}</span>
            <span>{t.footer.location}</span>
          </div>
        </div>
      </footer>

      <PackageModal
        pkg={activePackage}
        lang={lang}
        onClose={() => setActivePackage(null)}
        onRequestQuote={handleRequestQuote}
      />
    </div>
  );
}
