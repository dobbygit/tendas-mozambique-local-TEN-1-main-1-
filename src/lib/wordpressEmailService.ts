import { EmailData, QuoteRequestData, ContactFormData } from "./emailService";

/**
 * Send a generic email using WordPress
 */
export async function sendEmailWordPress(
  data: EmailData,
): Promise<{ success: boolean; message: string }> {
  try {
    // Check if wpData is available (WordPress environment)
    if (typeof window === "undefined" || !window.wpData) {
      throw new Error("WordPress data not available");
    }

    // Get the WordPress REST API URL and nonce from the global wpData object
    const { restUrl, nonce } = window.wpData;

    // Make a request to the WordPress REST API
    const response = await fetch(`${restUrl}tendas/v1/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": nonce,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to send email");
    }

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email via WordPress:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send a quote request email through WordPress
 */
export async function sendQuoteRequestEmailWordPress(
  data: QuoteRequestData,
): Promise<{ success: boolean; message: string }> {
  try {
    // Format the data for the WordPress endpoint
    const emailData: EmailData = {
      to: "info@tendasdemozambique.com", // Replace with your actual email
      subject: `Quote Request: ${data.productName || "Custom Product"} - ${data.name}`,
      body: `
        <h2>Quote Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
        <p><strong>Product:</strong> ${data.productName || "Custom Product"}</p>
        <p><strong>Quantity:</strong> ${data.quantity || 1}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    };

    return await sendEmailWordPress(emailData);
  } catch (error) {
    console.error("Error sending quote request via WordPress:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send a contact form email through WordPress
 */
export async function sendContactFormEmailWordPress(
  data: ContactFormData,
): Promise<{ success: boolean; message: string }> {
  try {
    // Format the data for the WordPress endpoint
    const emailData: EmailData = {
      to: "info@tendasdemozambique.com", // Replace with your actual email
      subject: `Contact Form: ${data.name}`,
      body: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    };

    return await sendEmailWordPress(emailData);
  } catch (error) {
    console.error("Error sending contact form via WordPress:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Add a type declaration for the WordPress data object
declare global {
  interface Window {
    wpData?: {
      restUrl: string;
      nonce: string;
      [key: string]: any;
    };
  }
}
