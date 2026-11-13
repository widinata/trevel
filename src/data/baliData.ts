import ubudRiceTerracesImg from '../assets/images/ubud_rice_terraces_1794545099897.jpg';
import uluwatuCliffTempleImg from '../assets/images/uluwatu_cliff_temple_1794545100247.jpg';
import ulunDanuTempleImg from '../assets/images/ulun_danu_temple_1794545100970.jpg';
import tirtaGanggaPalaceImg from '../assets/images/tirta_gangga_palace_1794545101017.jpg';
import tanahLotTempleImg from '../assets/images/tanah_lot_temple_1794545101100.jpg';
import kintamaniMountBaturImg from '../assets/images/kintamani_mount_batur_1794545102034.jpg';
import lovinaDolphinSunriseImg from '../assets/images/lovina_dolphin_sunrise_1794545102589.jpg';
import denpasarBaliLandmarkImg from '../assets/images/denpasar_bali_landmark_1794545103111.jpg';
import jimbaranSunsetDinnerImg from '../assets/images/jimbaran_sunset_dinner_1794545103312.jpg';

export type Lang = 'en' | 'id';
export type RegionKey = 'south' | 'central' | 'east' | 'north' | 'west';
export type PackageDuration = 'Full Day' | 'Half Day';

export const BRAND_NAME = 'Dek Army Tour n Trevel';
export const CONTACT_PHONE_DISPLAY = '+62 813-5355-4337';
export const CONTACT_WHATSAPP_NUMBER = '6281353554337';

export const HERO_IMAGE = ubudRiceTerracesImg;
export const FEATURE_IMAGE = kintamaniMountBaturImg;

export interface RegionInfo {
  key: RegionKey;
  index: string;
  name: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  highlights: Record<Lang, string>;
  mapQuery: string;
  img: string;
  alt: Record<Lang, string>;
}

export interface TourPackage {
  id: string;
  name: string;
  type: PackageDuration;
  region: RegionKey;
  regionLabel: Record<Lang, string>;
  desc: Record<Lang, string>;
  img: string;
  route: Record<Lang, string[]>;
  origin: string;
  destination: string;
  waypoints: string[];
  estimatedWindow: Record<Lang, string>;
}

export const REGIONS: RegionInfo[] = [
  {
    key: 'south',
    index: '01',
    name: { en: 'South Bali', id: 'Bali Selatan' },
    subtitle: { en: 'Coast & culture', id: 'Pesisir & budaya' },
    highlights: {
      en: 'Uluwatu Temple, Kecak sunset cliff, Jimbaran Bay & Pandawa Beach',
      id: 'Pura Uluwatu, tebing sunset & tari Kecak, Teluk Jimbaran & Pantai Pandawa',
    },
    mapQuery: 'Uluwatu Temple, South Bali, Indonesia',
    img: uluwatuCliffTempleImg,
    alt: {
      en: 'Pura Luhur Uluwatu perched on dramatic ocean cliffs in South Bali',
      id: 'Pura Luhur Uluwatu di atas tebing samudra Bali Selatan',
    },
  },
  {
    key: 'central',
    index: '02',
    name: { en: 'Central Bali', id: 'Bali Tengah' },
    subtitle: { en: 'Art & nature', id: 'Seni & alam' },
    highlights: {
      en: 'Ubud rice terraces, local artisan villages & Kintamani highlands',
      id: 'Terasering sawah Ubud, desa seni & dataran tinggi Kintamani',
    },
    mapQuery: 'Tegalalang Rice Terrace, Ubud, Bali, Indonesia',
    img: ubudRiceTerracesImg,
    alt: {
      en: 'Tegalalang green rice terraces in Ubud, Central Bali',
      id: 'Terasering sawah hijau Ubud di Bali Tengah',
    },
  },
  {
    key: 'east',
    index: '03',
    name: { en: 'East Bali', id: 'Bali Timur' },
    subtitle: { en: 'Heritage & views', id: 'Warisan & panorama' },
    highlights: {
      en: 'Tirta Gangga water palace, Lempuyang Temple & Candidasa coast',
      id: 'Istana Air Tirta Gangga, Pura Lempuyang & pesisir Candidasa',
    },
    mapQuery: 'Tirta Gangga, Karangasem, East Bali, Indonesia',
    img: tirtaGanggaPalaceImg,
    alt: {
      en: 'Tirta Gangga royal water palace gardens and koi ponds in East Bali',
      id: 'Taman Air Tirta Gangga di Bali Timur',
    },
  },
  {
    key: 'north',
    index: '04',
    name: { en: 'North Bali', id: 'Bali Utara' },
    subtitle: { en: 'Lakes & waterfalls', id: 'Danau & air terjun' },
    highlights: {
      en: 'Pura Ulun Danu Beratan, Gitgit Waterfall & Lovina sunrise coast',
      id: 'Pura Ulun Danu Beratan, Air Terjun Gitgit & Pantai Lovina',
    },
    mapQuery: 'Pura Ulun Danu Beratan, Bedugul, Bali, Indonesia',
    img: ulunDanuTempleImg,
    alt: {
      en: 'Pura Ulun Danu Beratan floating temple on Lake Beratan in North Bali',
      id: 'Pura Ulun Danu Beratan di tepi Danau Beratan, Bali Utara',
    },
  },
  {
    key: 'west',
    index: '05',
    name: { en: 'West Bali', id: 'Bali Barat' },
    subtitle: { en: 'Sea temple & sunset', id: 'Pura laut & senja' },
    highlights: {
      en: 'Pura Tanah Lot sea temple, coastal sunsets & West Bali tranquility',
      id: 'Pura Tanah Lot, panorama matahari terbenam & pesisir Bali Barat',
    },
    mapQuery: 'Tanah Lot Temple, Tabanan, Bali, Indonesia',
    img: tanahLotTempleImg,
    alt: {
      en: 'Pura Tanah Lot sea temple at sunset in West Bali',
      id: 'Pura Tanah Lot saat matahari terbenam di Bali Barat',
    },
  },
];

export const PACKAGES: TourPackage[] = [
  {
    id: 'ubud-tour',
    name: 'Ubud Tour',
    type: 'Full Day',
    region: 'central',
    regionLabel: { en: 'Central Bali', id: 'Bali Tengah' },
    desc: {
      en: 'Discover the cultural heart of Bali through Tegalalang rice terraces, local art villages, and lush valley scenery.',
      id: 'Jelajahi jantung budaya Bali melalui terasering sawah Tegalalang Ubud, desa seni lokal, dan lembah hijau yang asri.',
    },
    img: ubudRiceTerracesImg,
    route: {
      en: ['Hotel pickup in Bali', 'Tegalalang rice terraces & Ubud attractions', 'Return drop-off to your accommodation'],
      id: ['Penjemputan di hotel', 'Terasering sawah Tegalalang & destinasi Ubud', 'Pengantaran kembali ke akomodasi'],
    },
    origin: 'Ubud, Bali',
    destination: 'Tegalalang Rice Terrace, Bali',
    waypoints: ['Sacred Monkey Forest Sanctuary, Ubud'],
    estimatedWindow: { en: '8–10 hours (flexible)', id: '8–10 jam (fleksibel)' },
  },
  {
    id: 'south-bali-tour',
    name: 'South Bali Tour',
    type: 'Full Day',
    region: 'south',
    regionLabel: { en: 'South Bali', id: 'Bali Selatan' },
    desc: {
      en: 'A coastal journey through southern Bali featuring pristine beaches, dramatic limestone cliffs, and Uluwatu Temple sunset views.',
      id: 'Perjalanan pesisir menyusuri Bali Selatan menuju pantai pilihan, tebing kapur megah, dan sunset di Pura Uluwatu.',
    },
    img: uluwatuCliffTempleImg,
    route: {
      en: ['South Bali pickup area', 'Pandawa or Melasti coastal attraction', 'Uluwatu Temple sunset & Kecak option'],
      id: ['Titik jemput area Bali Selatan', 'Pantai Pandawa atau Melasti', 'Sunset Pura Uluwatu & opsi tari Kecak'],
    },
    origin: 'Kuta, Bali',
    destination: 'Uluwatu Temple, Bali',
    waypoints: ['Pandawa Beach, Bali'],
    estimatedWindow: { en: '8–10 hours (flexible)', id: '8–10 jam (fleksibel)' },
  },
  {
    id: 'ubud-kintamani',
    name: 'Ubud & Kintamani',
    type: 'Full Day',
    region: 'central',
    regionLabel: { en: 'Central Bali', id: 'Bali Tengah' },
    desc: {
      en: 'Combine the artistic charm of Ubud with sweeping panoramic views of Mount Batur and Lake Batur in the Kintamani highlands.',
      id: 'Padukan pesona seni Ubud dengan panorama Gunung Batur dan Danau Batur di dataran tinggi sejuk Kintamani.',
    },
    img: kintamaniMountBaturImg,
    route: {
      en: ['Ubud cultural & terrace stops', 'Kintamani Mount Batur caldera viewpoint', 'Return to pickup point'],
      id: ['Kawasan Ubud & terasering', 'Titik pandang kaldera Gunung Batur Kintamani', 'Kembali ke titik jemput'],
    },
    origin: 'Ubud, Bali',
    destination: 'Kintamani, Bali',
    waypoints: ['Tirta Empul Temple, Bali'],
    estimatedWindow: { en: '9–10 hours (flexible)', id: '9–10 jam (fleksibel)' },
  },
  {
    id: 'ubud-tanah-lot',
    name: 'Ubud & Tanah Lot',
    type: 'Full Day',
    region: 'west',
    regionLabel: { en: 'Central & West Bali', id: 'Bali Tengah & Barat' },
    desc: {
      en: 'A balanced itinerary pairing inland Ubud greenery and heritage stops with a sunset visit to Pura Tanah Lot sea temple.',
      id: 'Rute seimbang yang memadukan kehijauan Ubud dan situs warisan budaya dengan kunjungan senja di Pura Tanah Lot.',
    },
    img: tanahLotTempleImg,
    route: {
      en: ['Ubud area', 'Taman Ayun heritage stop & Tanah Lot', 'Return to pickup point'],
      id: ['Kawasan Ubud', 'Pura Taman Ayun & Pura Tanah Lot', 'Kembali ke titik jemput'],
    },
    origin: 'Ubud, Bali',
    destination: 'Tanah Lot, Bali',
    waypoints: ['Taman Ayun Temple, Mengwi, Bali'],
    estimatedWindow: { en: '8–10 hours (flexible)', id: '8–10 jam (fleksibel)' },
  },
  {
    id: 'east-bali-tour',
    name: 'East Bali Tour',
    type: 'Full Day',
    region: 'east',
    regionLabel: { en: 'East Bali', id: 'Bali Timur' },
    desc: {
      en: 'Explore Tirta Gangga water palace, Lempuyang Temple, and serene Candidasa coastal views in eastern Bali.',
      id: 'Eksplorasi Taman Air Tirta Gangga, Pura Lempuyang, serta ketenangan pesisir Candidasa di Bali Timur.',
    },
    img: tirtaGanggaPalaceImg,
    route: {
      en: ['Candidasa coastal corridor', 'Tirta Gangga Water Palace & Lempuyang area', 'Return to pickup point'],
      id: ['Jalur pesisir Candidasa', 'Istana Air Tirta Gangga & kawasan Lempuyang', 'Kembali ke titik jemput'],
    },
    origin: 'Candidasa, Bali',
    destination: 'Lempuyang Temple, Bali',
    waypoints: ['Tirta Gangga, Bali'],
    estimatedWindow: { en: '10–11 hours (flexible)', id: '10–11 jam (fleksibel)' },
  },
  {
    id: 'bali-green-sunset',
    name: 'Bali Green & Sunset',
    type: 'Full Day',
    region: 'north',
    regionLabel: { en: 'North & West Bali', id: 'Bali Utara & Barat' },
    desc: {
      en: 'Visit iconic Pura Ulun Danu Beratan in cool Bedugul highlands before continuing south for sunset at Tanah Lot.',
      id: 'Kunjungi Pura Ulun Danu Beratan di sejuknya Bedugul sebelum melanjutkan perjalanan menikmati senja di Tanah Lot.',
    },
    img: ulunDanuTempleImg,
    route: {
      en: ['Bedugul Pura Ulun Danu Beratan', 'Jatiluwih green highland views', 'Tanah Lot sunset & return'],
      id: ['Pura Ulun Danu Beratan Bedugul', 'Panorama hijau dataran tinggi Jatiluwih', 'Sunset Tanah Lot & kembali'],
    },
    origin: 'Pura Ulun Danu Beratan, Bali',
    destination: 'Tanah Lot, Bali',
    waypoints: ['Jatiluwih Rice Terraces, Bali'],
    estimatedWindow: { en: '9–10 hours (flexible)', id: '9–10 jam (fleksibel)' },
  },
  {
    id: 'bali-dolphin-tour',
    name: 'Bali Dolphin Tour',
    type: 'Full Day',
    region: 'north',
    regionLabel: { en: 'North Bali', id: 'Bali Utara' },
    desc: {
      en: 'An early morning boat journey off Lovina Beach to spot wild dolphins at sunrise, paired with North Bali waterfall stops.',
      id: 'Pengalaman perahu pagi di Pantai Lovina untuk menyaksikan lumba-lumba saat matahari terbit, dipadukan air terjun Bali Utara.',
    },
    img: lovinaDolphinSunriseImg,
    route: {
      en: ['Early morning departure to Lovina Beach', 'Sunrise dolphin boat excursion', 'Gitgit Waterfall & return via highlands'],
      id: ['Keberangkatan dini hari ke Pantai Lovina', 'Perjalanan perahu lumba-lumba saat sunrise', 'Air Terjun Gitgit & kembali via pegunungan'],
    },
    origin: 'Lovina Beach, Bali',
    destination: 'Gitgit Waterfall, Bali',
    waypoints: [],
    estimatedWindow: { en: '10–12 hours (early start)', id: '10–12 jam (mulai dini hari)' },
  },
  {
    id: 'ubud-half-day',
    name: 'Ubud Half Day',
    type: 'Half Day',
    region: 'central',
    regionLabel: { en: 'Central Bali', id: 'Bali Tengah' },
    desc: {
      en: 'A focused half-day visit to Ubud rice terraces, local markets, and artisan workshops for travelers with limited time.',
      id: 'Kunjungan setengah hari ke terasering sawah Ubud, pasar seni, dan galeri lokal bagi pelancong dengan waktu terbatas.',
    },
    img: ubudRiceTerracesImg,
    route: {
      en: ['Hotel pickup', 'Tegalalang rice terraces & Ubud center', 'Return to pickup point'],
      id: ['Penjemputan hotel', 'Terasering Tegalalang & pusat Ubud', 'Kembali ke titik jemput'],
    },
    origin: 'Ubud, Bali',
    destination: 'Ubud Art Market, Bali',
    waypoints: [],
    estimatedWindow: { en: '4–5 hours (flexible)', id: '4–5 jam (fleksibel)' },
  },
  {
    id: 'uluwatu-half-day',
    name: 'Uluwatu Half Day',
    type: 'Half Day',
    region: 'south',
    regionLabel: { en: 'South Bali', id: 'Bali Selatan' },
    desc: {
      en: 'An afternoon private trip to Pura Luhur Uluwatu cliffside temple with optional sunset Kecak Fire Dance.',
      id: 'Perjalanan privat sore hari menuju Pura Luhur Uluwatu di tepi tebing laut dengan pilihan pertunjukan tari Kecak.',
    },
    img: uluwatuCliffTempleImg,
    route: {
      en: ['South Bali pickup area', 'Pura Luhur Uluwatu cliffside temple', 'Return to pickup point'],
      id: ['Area jemput Bali Selatan', 'Pura Luhur Uluwatu tepi tebing', 'Kembali ke titik jemput'],
    },
    origin: 'Jimbaran, Bali',
    destination: 'Uluwatu Temple, Bali',
    waypoints: [],
    estimatedWindow: { en: '4–5 hours (afternoon)', id: '4–5 jam (sore hari)' },
  },
  {
    id: 'tanah-lot-half-day',
    name: 'Tanah Lot Half Day',
    type: 'Half Day',
    region: 'west',
    regionLabel: { en: 'West Bali', id: 'Bali Barat' },
    desc: {
      en: 'A dedicated afternoon visit to Pura Tanah Lot coastal temple timed around golden hour sunset views.',
      id: 'Kunjungan terfokus sore hari menuju Pura Tanah Lot di pesisir barat Bali untuk menikmati panorama senja.',
    },
    img: tanahLotTempleImg,
    route: {
      en: ['Hotel pickup', 'Pura Tanah Lot coastal temple', 'Return to pickup point'],
      id: ['Penjemputan hotel', 'Pura Tanah Lot pesisir barat', 'Kembali ke titik jemput'],
    },
    origin: 'Seminyak, Bali',
    destination: 'Tanah Lot, Bali',
    waypoints: [],
    estimatedWindow: { en: '4–5 hours (afternoon)', id: '4–5 jam (sore hari)' },
  },
  {
    id: 'bali-city-tour',
    name: 'Bali City Tour',
    type: 'Half Day',
    region: 'south',
    regionLabel: { en: 'Denpasar & South', id: 'Denpasar & Selatan' },
    desc: {
      en: 'Explore Bajra Sandhi Monument, traditional local markets, and Denpasar heritage districts in a relaxed short trip.',
      id: 'Kunjungi Monumen Bajra Sandhi, pasar tradisional, dan kawasan bersejarah di Denpasar dalam tur singkat yang santai.',
    },
    img: denpasarBaliLandmarkImg,
    route: {
      en: ['Denpasar area pickup', 'Bajra Sandhi Monument & local market', 'Return to pickup point'],
      id: ['Penjemputan area Denpasar', 'Monumen Bajra Sandhi & pasar lokal', 'Kembali ke titik jemput'],
    },
    origin: 'Denpasar, Bali',
    destination: 'Bajra Sandhi Monument, Denpasar, Bali',
    waypoints: [],
    estimatedWindow: { en: '4–5 hours (flexible)', id: '4–5 jam (fleksibel)' },
  },
  {
    id: 'jimbaran-sunset-dinner',
    name: 'Jimbaran Sunset Dinner',
    type: 'Half Day',
    region: 'south',
    regionLabel: { en: 'South Bali', id: 'Bali Selatan' },
    desc: {
      en: 'Private evening transfer to Jimbaran Bay for beachfront grilled seafood dining under the golden coastal sunset.',
      id: 'Antar-jemput privat petang hari ke Teluk Jimbaran untuk menikmati santap malam seafood di tepi pantai saat matahari terbenam.',
    },
    img: jimbaranSunsetDinnerImg,
    route: {
      en: ['Hotel pickup', 'Jimbaran Bay beachfront dining area', 'Return to pickup point'],
      id: ['Penjemputan hotel', 'Restoran tepi pantai Teluk Jimbaran', 'Kembali ke titik jemput'],
    },
    origin: 'Kuta, Bali',
    destination: 'Jimbaran Bay, Bali',
    waypoints: [],
    estimatedWindow: { en: '3–4 hours (evening)', id: '3–4 jam (petang)' },
  },
];

export const COPY = {
  en: {
    nav: {
      destinations: 'Destinations',
      packages: 'Packages',
      routes: 'Routes',
      contact: 'Contact',
      cta: 'Plan Your Trip',
    },
    hero: {
      eyebrow: 'Dek Army Tour n Trevel · Private Bali Tours',
      titleLine1: 'Discover Bali.',
      titleLine2: 'Explore More.',
      titleLine3: 'Experience Better.',
      subtitle:
        'Explore the island at your own pace with private tours, curated regional guides, and a local team ready to tailor your journey.',
      ctaPrimary: 'Explore Tour Packages',
      ctaSecondary: 'Discover Destinations',
      notes: ['Private & flexible trips', 'Local destination guide', 'WhatsApp +62 813-5355-4337'],
    },
    strip: [
      { title: 'Explore by Region', desc: "Browse highlights across Bali's five distinct regions" },
      { title: 'Flexible Private Tours', desc: 'Adjust stops and pace to suit your travel style' },
      { title: 'Direct WhatsApp Booking', desc: 'Ask for routes and latest rates at +62 813-5355-4337' },
    ],
    destinations: {
      kicker: 'Explore the island',
      title: 'Find Your Bali',
      subtitle:
        'Select a region to preview its route on the map and filter matching tour packages.',
      clearFilter: 'Show all regions',
      selectedHint: 'Showing route & packages for',
    },
    packages: {
      kicker: 'Curated journeys',
      title: 'Popular Tour Packages',
      subtitle:
        'Choose a suggested route, inspect its stops, and contact Dek Army Tour n Trevel to confirm availability and latest quotation.',
      filters: {
        all: 'All Packages',
        full: 'Full Day',
        half: 'Half Day',
      },
      empty: 'No packages match this filter combination. Try switching to All Packages.',
      resetFilters: 'Reset filters',
      cardAction: 'View details',
      mapAction: 'Preview route',
    },
    feature: {
      kicker: 'Travel with confidence',
      title: 'Your Trip, Your Pace',
      body: 'Dek Army Tour n Trevel turns destination ideas into a smooth, practical itinerary. Start from a suggested package or send us your custom wishlist.',
      items: [
        'Private transport arrangement and flexible discussion',
        'Destination guidance and realistic daily route planning',
        'Hotel pickup and drop-off service by request',
        'Transparent latest quotation confirmed directly by our team',
        'Personal assistance before and during your Bali trip',
      ],
      cta: 'Talk to Our Team',
    },
    routes: {
      kicker: 'Plan your journey',
      title: 'See the Route.\nEnjoy the Journey.',
      subtitle:
        'Select any region or tour package to preview its suggested route corridor in Google Maps. Final stops and order are confirmed with our team.',
      activeRouteLabel: 'Currently previewing',
      defaultRouteLabel: 'Bali Island Overview',
      steps: [
        { title: 'Choose a tour package or region', desc: 'Filter by duration or island region above' },
        { title: 'Review the route corridor', desc: 'Check travel direction and suggested stops' },
        { title: 'Confirm your plan via WhatsApp', desc: 'Chat +62 813-5355-4337 for timing and quote' },
      ],
      cta: 'Open in Google Maps',
      browseCta: 'Choose a Tour',
    },
    promise: {
      kicker: 'The Dek Army promise',
      quote: '“A good journey is not only about the places you visit, but how comfortably you experience every moment.”',
      attribution: 'A travel philosophy from Dek Army Tour n Trevel · Bali, Indonesia',
    },
    contact: {
      kicker: "Let's plan together",
      title: 'Start Your Bali Story',
      subtitle:
        'Share your travel dates, group size, and places in mind. We will prepare a tailored suggestion and confirm the latest quotation.',
      infoTitle: 'Contact Dek Army Tour n Trevel',
      rows: [
        { title: 'WhatsApp & Phone', desc: '+62 813-5355-4337 — Direct trip consultation & booking' },
        { title: 'Bali, Indonesia', desc: 'Private tours & custom transport across the island' },
        { title: 'Flexible Consultation', desc: 'Tailored pickup times, stops, and group sizes' },
      ],
      disclaimer:
        'Package prices are quoted on request based on pickup area, date, and inclusions. Contact Dek Army Tour n Trevel via WhatsApp (+62 813-5355-4337) for the latest rate.',
      formTitle: 'Send a Trip Inquiry',
      labels: {
        name: 'Your name',
        namePlaceholder: 'Full name',
        date: 'Preferred travel date',
        guests: 'Number of guests',
        interest: 'What would you like to explore?',
        message: 'Additional notes or pickup area',
        messagePlaceholder: 'e.g., Staying in Seminyak, interested in waterfalls and coffee stops...',
        submit: 'Prepare WhatsApp Message',
      },
      previewTitle: 'WhatsApp Inquiry Ready',
      previewNote:
        'Your inquiry message is ready to send directly to Dek Army Tour n Trevel (+62 813-5355-4337).',
      copyBtn: 'Copy Message',
      copiedBtn: 'Copied',
      openWaBtn: 'Send via WhatsApp',
      editBtn: 'Edit Details',
    },
    modal: {
      routeTitle: 'Suggested route',
      infoTitle: 'Package information',
      infoItems: [
        'Duration: subject to confirmation',
        'Private transport: air-conditioned vehicle & local driver',
        'Pickup point: hotel / villa by request',
        'Entrance tickets & meals: confirm inclusions with team',
      ],
      priceTitle: 'Price on request.',
      priceBody:
        'Final price, itinerary timing, availability, and package inclusions are confirmed directly by Dek Army Tour n Trevel (+62 813-5355-4337).',
      openMap: 'Open Route in Google Maps',
      askQuote: 'Ask for a Quote',
    },
    footer: {
      tagline: 'Discover Bali. Explore More. Experience Better.',
      sub: 'A personal travel guide and private tour service for your Bali journey.',
      explore: 'Explore',
      touch: 'Get in touch',
      copyright: '© 2026 Dek Army Tour n Trevel. All rights reserved.',
      location: 'Bali, Indonesia · +62 813-5355-4337',
    },
  },
  id: {
    nav: {
      destinations: 'Destinasi',
      packages: 'Paket Tour',
      routes: 'Peta Rute',
      contact: 'Kontak',
      cta: 'Rencanakan Trip',
    },
    hero: {
      eyebrow: 'Dek Army Tour n Trevel · Tur Privat Bali',
      titleLine1: 'Jelajahi Bali.',
      titleLine2: 'Temukan Lebih.',
      titleLine3: 'Nikmati Lebih Baik.',
      subtitle:
        'Nikmati pulau Bali sesuai ritme Anda bersama tur privat, panduan wilayah lokal, dan tim Dek Army Tour n Trevel yang siap merancang perjalanan terbaik.',
      ctaPrimary: 'Lihat Paket Tour',
      ctaSecondary: 'Jelajahi Destinasi',
      notes: ['Perjalanan privat & fleksibel', 'Pemandu destinasi lokal', 'WhatsApp +62 813-5355-4337'],
    },
    strip: [
      { title: 'Jelajah per Wilayah', desc: 'Temukan destinasi di lima kawasan utama Bali' },
      { title: 'Tur Privat Fleksibel', desc: 'Sesuaikan rute dan durasi dengan gaya liburan Anda' },
      { title: 'Pemesanan WhatsApp Langsung', desc: 'Tanyakan rute & harga terbaru di +62 813-5355-4337' },
    ],
    destinations: {
      kicker: 'Jelajahi pulau dewata',
      title: 'Temukan Bali Anda',
      subtitle:
        'Pilih salah satu wilayah untuk melihat pratinjau rute di peta dan menyaring paket tour yang sesuai.',
      clearFilter: 'Tampilkan semua wilayah',
      selectedHint: 'Menampilkan rute & paket untuk',
    },
    packages: {
      kicker: 'Perjalanan pilihan',
      title: 'Paket Tour Populer',
      subtitle:
        'Pilih saran perjalanan di bawah ini, tinjau rutenya, lalu hubungi Dek Army Tour n Trevel untuk konfirmasi ketersediaan dan penawaran terbaru.',
      filters: {
        all: 'Semua Paket',
        full: 'Full Day',
        half: 'Half Day',
      },
      empty: 'Belum ada paket yang cocok dengan filter ini. Coba tampilkan Semua Paket.',
      resetFilters: 'Reset filter',
      cardAction: 'Lihat detail',
      mapAction: 'Pratinjau rute',
    },
    feature: {
      kicker: 'Bepergian dengan tenang',
      title: 'Perjalanan Anda, Ritme Anda',
      body: 'Dek Army Tour n Trevel membantu mengubah rencana destinasi menjadi perjalanan yang nyaman dan terarah. Mulai dari paket saran atau ajukan rute kustom.',
      items: [
        'Pengaturan perjalanan privat dengan diskusi yang fleksibel',
        'Informasi destinasi dan perencanaan alur rute yang realistis',
        'Layanan antar-jemput hotel atau vila sesuai permintaan',
        'Harga terbaru dikonfirmasi langsung oleh tim kami',
        'Pendampingan personal sebelum dan selama perjalanan Anda',
      ],
      cta: 'Hubungi Tim Kami',
    },
    routes: {
      kicker: 'Rencanakan perjalanan',
      title: 'Lihat Rutenya.\nNikmati Perjalanannya.',
      subtitle:
        'Pilih wilayah atau paket tour untuk melihat gambaran koridor rute di Google Maps. Urutan dan titik henti final dikonfirmasi bersama tim kami.',
      activeRouteLabel: 'Pratinjau aktif',
      defaultRouteLabel: 'Gambaran Pulau Bali',
      steps: [
        { title: 'Pilih paket atau wilayah', desc: 'Gunakan filter durasi atau kartu wilayah di atas' },
        { title: 'Tinjau arah rute', desc: 'Periksa urutan destinasi dan perkiraan arah perjalanan' },
        { title: 'Konfirmasi via WhatsApp', desc: 'Hubungi +62 813-5355-4337 untuk jam jemput & harga' },
      ],
      cta: 'Buka di Google Maps',
      browseCta: 'Pilih Paket Tour',
    },
    promise: {
      kicker: 'Komitmen Dek Army Tour n Trevel',
      quote: '“Perjalanan yang berkesan bukan hanya tentang tempat yang dikunjungi, tetapi seberapa nyaman Anda menikmati setiap momennya.”',
      attribution: 'Filosofi perjalanan dari Dek Army Tour n Trevel · Bali, Indonesia',
    },
    contact: {
      kicker: 'Mari rencanakan bersama',
      title: 'Mulai Cerita Bali Anda',
      subtitle:
        'Bagikan tanggal perjalanan, jumlah peserta, dan tempat yang ingin dikunjungi. Tim kami siap membantu menyusun rencana terbaik.',
      infoTitle: 'Hubungi Dek Army Tour n Trevel',
      rows: [
        { title: 'WhatsApp & Telepon', desc: '+62 813-5355-4337 — Konsultasi langsung & info harga terbaru' },
        { title: 'Bali, Indonesia', desc: 'Layanan tur privat dan transportasi ke seluruh Bali' },
        { title: 'Konsultasi Fleksibel', desc: 'Jam jemput, rute, dan kapasitas grup dapat disesuaikan' },
      ],
      disclaimer:
        'Harga paket disesuaikan dengan area jemput, tanggal, serta inklusi. Hubungi Dek Army Tour n Trevel via WhatsApp (+62 813-5355-4337) untuk penawaran terbaru.',
      formTitle: 'Kirim Pertanyaan Perjalanan',
      labels: {
        name: 'Nama Anda',
        namePlaceholder: 'Nama lengkap',
        date: 'Rencana tanggal perjalanan',
        guests: 'Jumlah tamu',
        interest: 'Paket atau layanan yang diminati',
        message: 'Pesan tambahan atau area penjemputan',
        messagePlaceholder: 'Contoh: Menginap di Seminyak, ingin mengunjungi air terjun dan kebun kopi...',
        submit: 'Siapkan Pesan WhatsApp',
      },
      previewTitle: 'Pesan WhatsApp Siap Dikirim',
      previewNote:
        'Pesan pertanyaan Anda sudah siap dikirim langsung ke WhatsApp Dek Army Tour n Trevel (+62 813-5355-4337).',
      copyBtn: 'Salin Pesan',
      copiedBtn: 'Tersalin',
      openWaBtn: 'Kirim via WhatsApp',
      editBtn: 'Ubah Data',
    },
    modal: {
      routeTitle: 'Saran alur rute',
      infoTitle: 'Informasi paket',
      infoItems: [
        'Durasi: menyesuaikan kesepakatan rute',
        'Transportasi privat: kendaraan ber-AC & pengemudi lokal',
        'Titik jemput: hotel / vila sesuai permintaan',
        'Tiket masuk & makan: konfirmasi inklusi dengan tim',
      ],
      priceTitle: 'Harga sesuai permintaan.',
      priceBody:
        'Harga final, jam keberangkatan, ketersediaan, serta inklusi paket dikonfirmasi langsung oleh Dek Army Tour n Trevel (+62 813-5355-4337).',
      openMap: 'Buka Rute di Google Maps',
      askQuote: 'Minta Penawaran Harga',
    },
    footer: {
      tagline: 'Discover Bali. Explore More. Experience Better.',
      sub: 'Panduan wisata personal dan layanan tur privat untuk perjalanan Bali Anda.',
      explore: 'Eksplorasi',
      touch: 'Hubungi kami',
      copyright: '© 2026 Dek Army Tour n Trevel. Seluruh hak cipta dilindungi.',
      location: 'Bali, Indonesia · +62 813-5355-4337',
    },
  },
} as const;
