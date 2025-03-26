// Why Us page specific JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize testimonial slider
  initTestimonialSlider();
});

function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial");
  let currentIndex = 0;

  if (testimonials.length > 1) {
    // Hide all testimonials except the first one
    for (let i = 1; i < testimonials.length; i++) {
      testimonials[i].style.display = "none";
    }

    // Set up automatic slider
    setInterval(() => {
      testimonials[currentIndex].style.display = "none";
      currentIndex = (currentIndex + 1) % testimonials.length;
      testimonials[currentIndex].style.display = "block";
    }, 5000);
  }
}
