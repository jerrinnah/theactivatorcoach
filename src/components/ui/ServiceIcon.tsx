import type { ServiceCard } from "@/lib/siteData";

const paths: Record<ServiceCard["icon"], React.ReactNode> = {
  person: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 20.5c0-3.6 3.2-6.2 7.2-6.2s7.2 2.6 7.2 6.2" strokeLinecap="round" />
    </>
  ),
  couple: (
    <>
      <circle cx="8.4" cy="8.4" r="3.1" />
      <circle cx="16.2" cy="9.2" r="2.6" />
      <path d="M2.8 20c0-3.2 2.5-5.5 5.6-5.5s5.6 2.3 5.6 5.5" strokeLinecap="round" />
      <path d="M15 14.8c3 0 6.2 1.9 6.2 5.2" strokeLinecap="round" />
    </>
  ),
  rings: (
    <>
      <circle cx="9" cy="14" r="5.4" />
      <circle cx="15.4" cy="14" r="5.4" />
      <path d="M12.2 4.6 10 7.4h4.6L12.2 4.6Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.6" y="5.4" width="16.8" height="15" rx="2.6" />
      <path d="M3.6 10.2h16.8M8.4 3.4v3.6M15.6 3.4v3.6" strokeLinecap="round" />
      <path d="m9.4 14.8 1.8 1.8 3.6-3.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7v5.4l3.4 2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.6 12h16.8" strokeLinecap="round" />
      <path d="M12 3.4c2.3 2.4 3.5 5.4 3.5 8.6S14.3 18.2 12 20.6c-2.3-2.4-3.5-5.4-3.5-8.6S9.7 5.8 12 3.4Z" />
    </>
  ),
};

export default function ServiceIcon({
  name,
  className = "h-6 w-6",
}: {
  name: ServiceCard["icon"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
