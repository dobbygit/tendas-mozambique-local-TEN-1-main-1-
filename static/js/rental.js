// Rental page specific JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize rental form submission
  initRentalForm();
});

function initRentalForm() {
  const rentalForm = document.getElementById("rental-form");
  const rentalModal = document.getElementById("rental-modal");

  if (rentalForm && rentalModal) {
    rentalForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("rental-name").value,
        email: document.getElementById("rental-email").value,
        phone: document.getElementById("rental-phone").value,
        date: document.getElementById("rental-date").value,
        duration: document.getElementById("rental-duration").value,
        details: document.getElementById("rental-details").value,
        product: document.getElementById("rental-product").value,
      };

      // In a real app, you would send this data to the server
      console.log("Rental inquiry submitted:", formData);

      // Simulate API call
      setTimeout(() => {
        alert(
          "Thank you for your rental inquiry! We will get back to you soon."
        );
        rentalForm.reset();
        rentalModal.style.display = "none";
      }, 1000);
    });
  }
}
