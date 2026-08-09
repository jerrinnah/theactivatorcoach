/**
 * Shared shape for the server-action form results.
 *
 * This lives outside `app/actions.ts` deliberately: a `"use server"` module may
 * only export async functions, so the type and the initial value cannot be
 * declared alongside the actions themselves.
 */
export interface FormState {
  status: "idle" | "success" | "error";
  message: string;
  /** Field name → error, for inline validation messages. */
  fieldErrors?: Record<string, string>;
}

export const initialFormState: FormState = { status: "idle", message: "" };
