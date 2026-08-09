/**
 * Decorative line-art used throughout the site. All purely presentational —
 * every instance is aria-hidden and carries no semantic meaning.
 */

export function LeafBranch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      aria-hidden="true"
    >
      <path d="M100 320V40" strokeLinecap="round" />
      <path d="M100 90c-30-6-52-28-56-58 30 4 52 26 56 58Z" />
      <path d="M100 90c30-6 52-28 56-58-30 4-52 26-56 58Z" />
      <path d="M100 160c-30-6-52-28-56-58 30 4 52 26 56 58Z" />
      <path d="M100 160c30-6 52-28 56-58-30 4-52 26-56 58Z" />
      <path d="M100 230c-30-6-52-28-56-58 30 4 52 26 56 58Z" />
      <path d="M100 230c30-6 52-28 56-58-30 4-52 26-56 58Z" />
      <circle cx="100" cy="34" r="5" />
    </svg>
  );
}

export function PsiMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path
        d="M50 12v76M28 30v18a22 22 0 0 0 44 0V30"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PsiBadge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M50 26v48M34 38v10a16 16 0 0 0 32 0V38"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Soft organic blob used behind imagery and hero panels. */
export function Blob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M472 108c56 52 84 137 68 210s-76 134-146 165-155 32-208-8-79-121-64-193 71-133 140-176 154-50 210 2Z"
      />
    </svg>
  );
}

/** Line-art head with a coiled interior — echoes the assessment/psychology theme. */
export function HeadOutline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 260"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M168 246c-4-30 2-46 16-62 20-23 32-48 32-76C216 47 172 8 118 8 66 8 24 46 24 100c0 24 9 42 24 58 10 11 14 20 14 33v55"
        strokeLinecap="round"
      />
      <path
        d="M96 118c-16-4-24-14-22-26 2-13 15-20 28-15 6-16 24-22 37-12 12-9 28-4 33 9 14-1 24 10 22 24-2 12-12 20-25 20M96 118c-10 6-12 18-5 27 6 8 17 10 26 6M96 118c8-6 20-6 28 1M117 152c8 6 20 6 29-1M117 152v34"
        strokeLinecap="round"
      />
    </svg>
  );
}
