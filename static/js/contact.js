// Contact page specific JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize contact form submission
  initContactForm();
});

function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value,
      };

      // In a real app, you would send this data to the server
      console.log("Contact form submitted:", formData);

      // Simulate API call
      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Thank you for your message! We will get back to you soon.");
            contactForm.reset();
          } else {
            alert("There was an error submitting your form. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an error submitting your form. Please try again.");
        });
    });
  }
}
