import { useState } from 'react';
import { Compass } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackLabel?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function ImageWithFallback({
  src,
  alt,
  fallbackLabel,
  className = '',
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#173f35] via-[#1f4d41] to-[#102e27] text-[#e9eee9] ${className}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 240 160"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0 120 Q 60 80 120 110 T 240 95 L 240 160 L 0 160 Z"
            fill="#d8b77a"
          />
          <path
            d="M0 135 Q 80 105 160 128 T 240 118 L 240 160 L 0 160 Z"
            fill="#0d2620"
          />
          <circle cx="190" cy="40" r="18" stroke="#d8b77a" strokeWidth="1" fill="none" />
        </svg>
        <Compass className="relative z-10 mb-2 h-6 w-6 text-[#d8b77a]" aria-hidden="true" />
        <span className="relative z-10 px-4 text-center font-serif text-sm tracking-wide text-[#f6f3ec]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
