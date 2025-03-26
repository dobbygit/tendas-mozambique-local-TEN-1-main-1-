// Product page specific JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize product gallery
  initProductGallery();

  // Initialize quote form submission
  initQuoteForm();
});

function initProductGallery() {
  const mainImage = document.querySelector(".main-image img");
  const thumbnails = document.querySelectorAll(".thumbnail-gallery img");

  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        // Update main image src with clicked thumbnail src
        mainImage.src = this.src;

        // Remove active class from all thumbnails
        thumbnails.forEach((thumb) => thumb.classList.remove("active"));

        // Add active class to clicked thumbnail
        this.classList.add("active");
      });
    });
  }
}

function initQuoteForm() {
  const quoteForm = document.getElementById("quote-form");
  const quoteModal = document.getElementById("quote-modal");

  if (quoteForm && quoteModal) {
    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("quote-name").value,
        email: document.getElementById("quote-email").value,
        phone: document.getElementById("quote-phone").value,
        details: document.getElementById("quote-details").value,
        product: document.querySelector("h1").textContent, // Get product name from page title
      };

      // In a real app, you would send this data to the server
      console.log("Quote request submitted:", formData);

      // Simulate API call
      setTimeout(() => {
        alert(
          "Thank you for your quote request! We will get back to you soon."
        );
        quoteForm.reset();
        quoteModal.style.display = "none";
      }, 1000);
    });
  }
}
