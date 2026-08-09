import Image from "next/image";
import { HeadOutline, LeafBranch } from "@/components/ui/Ornaments";

/**
 * Photography slot.
 *
 * No portrait has been supplied yet, so every instance currently renders a
 * designed placeholder rather than a broken image. To use real photography:
 * drop the files into /public and set the paths in `portraits` below — the
 * layout, cropping and ornament work is already done.
 */
export const portraits = {
  hero: null as string | null, // e.g. "/lauretta-hero.jpg"
  about: null as string | null, // e.g. "/lauretta-portrait.jpg"
} as const;

interface PortraitFrameProps {
  src: string | null;
  alt: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/5]". */
  aspect?: string;
  className?: string;
  priority?: boolean;
  label?: string;
}

export default function PortraitFrame({
  src,
  alt,
  aspect = "aspect-[4/5]",
  className = "",
  priority = false,
  label = "Portrait",
}: PortraitFrameProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-[2.5rem] ${aspect} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[2.5rem] border border-sage/25 bg-gradient-to-br from-sage-mist via-cream-deep to-sage-soft ${aspect} ${className}`}
      role="img"
      aria-label={alt}
    >
      <LeafBranch className="absolute -left-6 bottom-0 h-3/4 w-32 text-sage/30" />
      <LeafBranch className="absolute -right-8 -top-4 h-2/3 w-28 rotate-180 text-sage/25" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
        <HeadOutline className="h-32 w-auto text-sage-deep/40" />
        <p className="text-[0.625rem] uppercase tracking-[0.24em] text-sage-deep/60">{label}</p>
      </div>
    </div>
  );
}
