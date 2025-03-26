import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Check, AlertCircle } from "lucide-react";
import { sendQuoteRequestEmailAdapted } from "../lib/emailServiceAdapter";
import { Alert, AlertDescription } from "./ui/alert";

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export default function QuoteRequestModal({
  isOpen,
  onClose,
  productName = "",
}: QuoteRequestModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send the quote request email
      const result = await sendQuoteRequestEmailAdapted({
        name,
        email,
        phone,
        message,
        productName,
      });

      if (result.success) {
        setIsSubmitted(true);

        // Reset form after showing success message
        setTimeout(() => {
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
          setIsSubmitted(false);
          onClose();
        }, 3000);
      } else {
        setError(
          result.message || "Failed to send quote request. Please try again.",
        );
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 p-6">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Request Quote for {productName}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2">
                Fill out the form below and our team will get back to you within
                24 hours with a custom quote.
              </DialogDescription>
            </DialogHeader>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
                  htmlFor="phone"
                  className="text-gray-700 dark:text-gray-200"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+258 XX XXX XXXX"
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
                  placeholder={`Please provide details about your ${productName} requirements...`}
                  rows={4}
                  required
                  className="w-full border-gray-300 dark:border-gray-600 focus:border-[#1b5e20] dark:focus:border-green-500"
                />
              </div>

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="mr-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#1b5e20] hover:bg-[#0d3d11] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Quote Request"}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <Check className="h-6 w-6 text-[#1b5e20] dark:text-green-400" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              Request Sent Successfully
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Thank you for your interest! Our team will contact you shortly
              with a custom quote.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
