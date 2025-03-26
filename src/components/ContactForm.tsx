import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Check, AlertCircle } from "lucide-react";
import { sendContactFormEmailAdapted } from "../lib/emailServiceAdapter";
import { Alert, AlertDescription } from "./ui/alert";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send the contact form email
      const result = await sendContactFormEmailAdapted({
        name,
        email,
        subject,
        message,
      });

      if (result.success) {
        setIsSubmitted(true);

        // Reset form after 5 seconds
        setTimeout(() => {
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError(result.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <Check className="h-6 w-6 text-[#1b5e20] dark:text-green-400" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
            Message Sent Successfully
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Thank you for contacting us! We'll get back to you as soon as
            possible.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Get in Touch
          </h2>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-gray-700 dark:text-gray-200"
              >
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className="w-full border-gray-300 dark:border-gray-600 focus:border-[#1b5e20] dark:focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-200"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full border-gray-300 dark:border-gray-600 focus:border-[#1b5e20] dark:focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="subject"
                className="text-gray-700 dark:text-gray-200"
              >
                Subject
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What is your message about?"
                required
                className="w-full border-gray-300 dark:border-gray-600 focus:border-[#1b5e20] dark:focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-gray-700 dark:text-gray-200"
              >
                Message
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please provide details about your inquiry..."
                rows={5}
                required
                className="w-full border-gray-300 dark:border-gray-600 focus:border-[#1b5e20] dark:focus:border-green-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1b5e20] hover:bg-[#0d3d11] text-white py-2.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
