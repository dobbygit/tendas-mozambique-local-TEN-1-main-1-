// Main JavaScript file for African Sun

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize language selector
  initLanguageSelector();

  // Add current year to footer
  addCurrentYearToFooter();

  // Initialize any modals on the page
  initModals();
});

// Language selector functionality
function initLanguageSelector() {
  const languageSelect = document.getElementById("language-select");
  if (languageSelect) {
    // Set initial value based on stored preference or default to English
    const storedLanguage = localStorage.getItem("preferredLanguage") || "en";
    languageSelect.value = storedLanguage;

    // Add change event listener
    languageSelect.addEventListener("change", function () {
      const selectedLanguage = this.value;
      localStorage.setItem("preferredLanguage", selectedLanguage);
      // In a real app, this would trigger language change throughout the site
      console.log(`Language changed to: ${selectedLanguage}`);
      // Reload page to apply language change
      // window.location.reload();
    });
  }
}

// Add current year to footer
function addCurrentYearToFooter() {
  const yearElements = document.querySelectorAll(".footer-bottom p");
  if (yearElements.length > 0) {
    const currentYear = new Date().getFullYear();
    yearElements.forEach((element) => {
      element.innerHTML = element.innerHTML.replace(
        "{{ current_year }}",
        currentYear
      );
    });
  }
}

// Initialize modals
function initModals() {
  // Get all modal triggers and modals
  const modalTriggers = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");
  const closeBtns = document.querySelectorAll(".close-btn");

  // Quote button on product page
  const quoteBtn = document.getElementById("quote-btn");
  const quoteModal = document.getElementById("quote-modal");

  if (quoteBtn && quoteModal) {
    quoteBtn.addEventListener("click", function () {
      quoteModal.style.display = "block";
    });
  }

  // Rental inquiry buttons
  const rentalBtns = document.querySelectorAll(".rental-btn");
  const rentalModal = document.getElementById("rental-modal");
  const rentalProductInput = document.getElementById("rental-product");

  if (rentalBtns.length > 0 && rentalModal && rentalProductInput) {
    rentalBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const product = this.getAttribute("data-product");
        rentalProductInput.value = product;
        rentalModal.style.display = "block";
      });
    });
  }

  // Close buttons for all modals
  if (closeBtns.length > 0) {
    closeBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const modal = this.closest(".modal");
        if (modal) {
          modal.style.display = "none";
        }
      });
    });
  }

  // Close modal when clicking outside of modal content
  window.addEventListener("click", function (event) {
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
}
