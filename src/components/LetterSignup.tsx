"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeToLetter } from "@/app/actions";
import { initialFormState } from "@/lib/formState";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="shrink-0 rounded-full bg-sage-deep px-7 py-3.5 text-sm font-medium text-white transition hover:bg-sage-dark disabled:opacity-60"
    >
      {pending ? "Adding you…" : "Send me the letter"}
    </button>
  );
}

export default function LetterSignup({ className = "" }: { className?: string }) {
  const [state, formAction] = useActionState(subscribeToLetter, initialFormState);

  return (
    <div className={className}>
      <form action={formAction} className="flex flex-col gap-3 sm:flex-row">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="letter-company">Company</label>
          <input id="letter-company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <label htmlFor="letter-email" className="sr-only">
          Email address
        </label>
        <input
          id="letter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          className="w-full rounded-full border border-line bg-cream px-6 py-3.5 text-[0.9375rem] text-ink placeholder:text-muted/70 focus:border-sage focus:outline-none"
        />
        <SubmitButton />
      </form>

      {state.message ? (
        <p
          role="status"
          className={`mt-4 text-sm leading-6 ${
            state.status === "success" ? "text-sage-deep" : "text-red-700"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <p className="mt-4 text-xs leading-5 text-muted">
        One email a month. No sequences, no upsells, unsubscribe in one click.
      </p>
    </div>
  );
}
