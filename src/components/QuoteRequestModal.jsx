import { useState } from "react";

function QuoteRequestModal({ product, onClose, isOpen = true, productName }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use productName if provided (for compatibility with storyboard), otherwise use product
  const displayProduct = productName || product;

  // If not open, don't render anything
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would send this data to the server
      console.log("Quote request submitted:", {
        ...formData,
        product: displayProduct,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Thank you for your quote request! We will get back to you soon.");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto flex justify-center items-start pt-10">
      <div className="modal-content bg-white rounded-lg p-8 max-w-xl w-full mx-4 relative">
        <span
          className="close-btn absolute top-4 right-4 text-2xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-2xl mb-6">Request a Quote for {displayProduct}</h2>
        <form id="quote-form" onSubmit={handleSubmit}>
          <div className="form-group mb-6">
            <label htmlFor="quote-name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              type="text"
              id="quote-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="quote-email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="quote-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="quote-phone" className="block mb-2 font-medium">
              Phone
            </label>
            <input
              type="tel"
              id="quote-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="quote-details" className="block mb-2 font-medium">
              Details
            </label>
            <textarea
              id="quote-details"
              name="details"
              rows="5"
              value={formData.details}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuoteRequestModal;
