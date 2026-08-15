// Hand-drawn style inline SVG doodles - matka, kulfi, marigold
// All use currentColor so they inherit brand tokens.

export const MatkaIcon = ({ className = "", strokeWidth = 2.5 }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 9h18" />
    <path d="M17 9c0 3-1.5 5.2-4 7.2C9 19.4 7 23.2 7 27.2 7 35.4 14.6 41 24 41s17-5.6 17-13.8c0-4-2-7.8-6-11-2.5-2-4-4.2-4-7.2" />
    <path d="M13.5 29.5c1.2 4.2 5 7 10.5 7.3" opacity="0.45" />
  </svg>
);

export const KulfiIcon = ({ className = "", strokeWidth = 2.5 }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 5h12a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z" />
    <path d="M24 30v12" />
    <path d="M20 12v9" opacity="0.45" />
    <path d="M28 12v5" opacity="0.45" />
  </svg>
);

export const MarigoldIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="3.2" />
    <circle cx="12" cy="5.4" r="2.6" opacity="0.75" />
    <circle cx="12" cy="18.6" r="2.6" opacity="0.75" />
    <circle cx="5.4" cy="12" r="2.6" opacity="0.75" />
    <circle cx="18.6" cy="12" r="2.6" opacity="0.75" />
    <circle cx="7.4" cy="7.4" r="2.4" opacity="0.6" />
    <circle cx="16.6" cy="7.4" r="2.4" opacity="0.6" />
    <circle cx="7.4" cy="16.6" r="2.4" opacity="0.6" />
    <circle cx="16.6" cy="16.6" r="2.4" opacity="0.6" />
  </svg>
);

export const MarigoldGarland = ({ className = "" }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
    <span className="h-px w-10 sm:w-16 bg-[#D6A84A]/70" />
    <MarigoldIcon className="h-4 w-4 text-[#E46A12]" />
    <MarigoldIcon className="h-5 w-5 text-[#D11B6B]" />
    <MarigoldIcon className="h-4 w-4 text-[#FFC533]" />
    <span className="h-px w-10 sm:w-16 bg-[#D6A84A]/70" />
  </div>
);

export const WhatsAppIcon = ({ className = "" }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.004 3C9.383 3 4 8.383 4 15.004c0 2.117.553 4.184 1.602 6.008L4 29l8.184-1.566a11.94 11.94 0 0 0 3.82.625h.004C22.625 28.059 28 22.676 28 16.055 28 9.434 22.625 3 16.004 3zm0 21.93h-.004a9.9 9.9 0 0 1-3.523-.66l-.254-.098-4.859.93.945-4.742-.164-.262a9.88 9.88 0 0 1-1.52-5.094c0-5.469 4.453-9.918 9.926-9.918 5.469 0 9.918 4.449 9.918 9.922 0 5.469-4.449 9.922-9.918 9.922zm5.442-7.43c-.297-.148-1.758-.867-2.031-.965-.273-.102-.473-.148-.672.148-.199.297-.77.965-.945 1.164-.172.199-.348.223-.645.074-.297-.148-1.254-.461-2.39-1.473-.883-.789-1.48-1.762-1.653-2.059-.172-.297-.019-.457.13-.605.133-.133.297-.348.445-.52.148-.176.199-.297.297-.496.098-.199.05-.373-.024-.522-.074-.148-.672-1.617-.921-2.215-.242-.578-.489-.5-.672-.51-.172-.008-.371-.01-.57-.01s-.52.074-.793.371c-.273.297-1.04 1.016-1.04 2.48 0 1.465 1.066 2.879 1.215 3.078.148.199 2.098 3.203 5.082 4.492.711.307 1.266.49 1.699.628.714.227 1.363.195 1.877.118.572-.085 1.758-.719 2.006-1.413.246-.695.246-1.29.172-1.414-.074-.125-.27-.199-.567-.348z" />
  </svg>
);
