/**
 * Email Service Adapter
 *
 * This file provides a unified interface for sending emails that works in both
 * the standalone React app (using Supabase) and in WordPress.
 */

import {
  sendEmail,
  sendQuoteRequestEmail,
  sendContactFormEmail,
  QuoteRequestData,
  ContactFormData,
  EmailData,
} from "./emailService";

import {
  sendEmailWordPress,
  sendQuoteRequestEmailWordPress,
  sendContactFormEmailWordPress,
} from "./wordpressEmailService";

/**
 * Detect if the app is running in WordPress
 */
function isRunningInWordPress(): boolean {
  return typeof window !== "undefined" && !!window.wpData;
}

/**
 * Send an email using the appropriate service
 */
export async function sendEmailAdapted(
  data: EmailData,
): Promise<{ success: boolean; message: string }> {
  if (isRunningInWordPress()) {
    return sendEmailWordPress(data);
  } else {
    return sendEmail(data);
  }
}

/**
 * Send a quote request email using the appropriate service
 */
export async function sendQuoteRequestEmailAdapted(
  data: QuoteRequestData,
): Promise<{ success: boolean; message: string }> {
  if (isRunningInWordPress()) {
    return sendQuoteRequestEmailWordPress(data);
  } else {
    return sendQuoteRequestEmail(data);
  }
}

/**
 * Send a contact form email using the appropriate service
 */
export async function sendContactFormEmailAdapted(
  data: ContactFormData,
): Promise<{ success: boolean; message: string }> {
  if (isRunningInWordPress()) {
    return sendContactFormEmailWordPress(data);
  } else {
    return sendContactFormEmail(data);
  }
}
