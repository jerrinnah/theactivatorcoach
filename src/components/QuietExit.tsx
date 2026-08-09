"use client";

import { useCallback, useEffect } from "react";

const SAFE_URL = "https://www.bbc.com/news";

/**
 * Safety exit for visitors who may be reading this on a shared device.
 *
 * Two things have to happen: open a neutral page, and remove this site from the
 * back button. `location.replace` swaps the current history entry rather than
 * pushing a new one, so "back" cannot return here. A new tab is opened first so
 * the neutral page is what remains visible if the tab is inspected.
 *
 * Pressing Escape three times triggers the same exit.
 */
export default function QuietExit() {
  const leave = useCallback(() => {
    try {
      window.open(SAFE_URL, "_blank", "noopener,noreferrer");
    } catch {
      /* popup blocked — the replace below still gets them off the page */
    }
    window.location.replace(SAFE_URL);
  }, []);

  useEffect(() => {
    let taps = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      taps += 1;
      clearTimeout(timer);
      if (taps >= 3) {
        leave();
        return;
      }
      timer = setTimeout(() => {
        taps = 0;
      }, 1200);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer);
    };
  }, [leave]);

  return (
    <button
      type="button"
      onClick={leave}
      title="Leaves this site immediately and removes it from your back button. Shortcut: press Escape three times."
      className="fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-line bg-white/95 px-4 py-2.5 text-xs font-medium text-ink-soft shadow-lg shadow-ink/5 backdrop-blur transition hover:border-sage-deep/50 hover:bg-sage-mist md:bottom-6"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M14 4h5v16h-5M13 12H3m0 0 4-4m-4 4 4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Quick exit
    </button>
  );
}
