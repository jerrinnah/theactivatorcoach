"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendEnquiry } from "@/app/actions";
import { initialFormState } from "@/lib/formState";

const topics = [
  "Individual Therapy",
  "Couples Therapy",
  "Before You Marry",
  "The Annual Review",
  "The Intensive",
  "Diaspora Sessions",
  "The Academy",
  "Speaking or media",
  "Something else",
];

const fieldClass =
  "w-full rounded-2xl border border-line bg-cream px-5 py-3.5 text-[0.9375rem] text-ink placeholder:text-muted/70 transition focus:border-sage focus:bg-white focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-sage-deep px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-sage-dark disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Sending…" : "Send this to Dr. Ogbum"}
    </button>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-red-700">{message}</p>;
}

export default function ContactForm() {
  const [state, formAction] = useActionState(sendEnquiry, initialFormState);

  if (state.status === "success") {
    return (
      <div className="rounded-4xl border border-sage/35 bg-sage-mist p-9 text-center sm:p-12">
        <svg viewBox="0 0 48 48" fill="none" className="mx-auto h-12 w-12 text-sage-deep" aria-hidden="true">
          <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="m15 24.5 6.5 6.5L33 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="mt-6 font-display text-3xl text-ink">Message received</h2>
        <p role="status" className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-7 text-ink-soft">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
            What should I call you?
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="First name is enough"
            aria-invalid={state.fieldErrors?.name ? true : undefined}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
            className={fieldClass}
          />
          <span id="name-error">
            <FieldError message={state.fieldErrors?.name} />
          </span>
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={state.fieldErrors?.email ? true : undefined}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
            className={fieldClass}
          />
          <span id="email-error">
            <FieldError message={state.fieldErrors?.email} />
          </span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="topic" className="mb-2 block text-sm font-medium text-ink">
            What is this about?
          </label>
          <select id="topic" name="topic" defaultValue="" className={fieldClass}>
            <option value="">Choose one — or leave it blank</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="preferredContact" className="mb-2 block text-sm font-medium text-ink">
            How should I reply?
          </label>
          <select
            id="preferredContact"
            name="preferredContact"
            defaultValue="Email"
            className={fieldClass}
          >
            <option value="Email">Email</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Either">Either is fine</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          What is happening?
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="A sentence or two is enough. You do not need to explain everything here — that is what the conversation is for."
          aria-invalid={state.fieldErrors?.message ? true : undefined}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y`}
        />
        <span id="message-error">
          <FieldError message={state.fieldErrors?.message} />
        </span>
      </div>

      <div>
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 rounded border-line accent-sage-deep"
            aria-invalid={state.fieldErrors?.consent ? true : undefined}
          />
          <span className="text-sm leading-6 text-ink-soft">
            I&apos;m happy for Dr. Ogbum to reply to me using the details above. Enquiries are kept
            confidential and are never shared or used for marketing.
          </span>
        </label>
        <FieldError message={state.fieldErrors?.consent} />
      </div>

      {state.status === "error" && !state.fieldErrors ? (
        <p role="alert" className="rounded-2xl bg-red-50 px-5 py-4 text-sm leading-6 text-red-800">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />

      <p className="text-xs leading-5 text-muted">
        This form is not monitored continuously and is not an emergency service. If you are at risk
        of harm, please use the crisis resources rather than waiting for a reply.
      </p>
    </form>
  );
}
