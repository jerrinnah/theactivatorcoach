"use server";

import { deliver } from "@/lib/mailer";
import { contactDetails } from "@/lib/siteData";
import type { FormState } from "@/lib/formState";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

const FALLBACK = `Your message could not be sent automatically. Please email ${contactDetails.email} and it will be picked up.`;

export async function sendEnquiry(_prev: FormState, data: FormData): Promise<FormState> {
  // Honeypot — bots fill hidden fields, humans never see them.
  if (text(data, "company")) {
    return { status: "success", message: "Thank you — your message has been received." };
  }

  const name = text(data, "name");
  const email = text(data, "email");
  const topic = text(data, "topic");
  const message = text(data, "message");
  const consent = data.get("consent") === "on";

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Please tell me what to call you.";
  if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "Please enter an email address I can reply to.";
  if (message.length < 10) fieldErrors.message = "A sentence or two is enough — just enough to go on.";
  if (!consent) fieldErrors.consent = "Please confirm you're happy for me to reply to you.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const result = await deliver({
    subject: `Website enquiry — ${topic || "General"} — ${name}`,
    replyTo: email,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Topic: ${topic || "Not specified"}`,
      "",
      message,
    ].join("\n"),
  });

  if (!result.delivered) {
    if (!result.configured) {
      // Delivery is not wired up yet — record it so nothing is lost.
      console.warn("[enquiry] mail transport not configured; enquiry logged only", {
        name,
        email,
        topic,
      });
    }
    return { status: "error", message: FALLBACK };
  }

  return {
    status: "success",
    message: `Thank you, ${name}. Your message has arrived. If you are in immediate danger, contact local emergency services rather than waiting for a reply.`,
  };
}
