document.addEventListener("DOMContentLoaded", function () {
  const enquiryPopup = document.getElementById("enquiryPopup");
  const closeBtn = document.getElementById("closeEnquiry");
  const scrollBtn = document.getElementById("scrollToTopBtn");
  const enquiryForm = document.getElementById("enquiryForm");

  // Show popup on page load
  enquiryPopup.style.display = "flex";
  document.body.style.overflow = "hidden"; // Disable scroll when popup is active

  // Close popup
  closeBtn.addEventListener("click", () => {
    enquiryPopup.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scroll
  });

  // Scroll-to-top button logic
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 100 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Handle form submission with Formspree via AJAX
  enquiryForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(enquiryForm);
    const plainFormData = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(plainFormData);

    try {
      const response = await fetch("https://formspree.io/f/meoklrww", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: jsonData
      });

      if (response.ok) {
        alert("Thank you! Your message has been sent.");
        enquiryPopup.style.display = "none";
        document.body.style.overflow = "auto";
        enquiryForm.reset();
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("There was an error submitting the form.");
      console.error(error);
    }
  });
});

// Hamburger menu toggle
const mobileMenuToggle = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Carousel script
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const images = document.querySelectorAll(".carousel-img");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  let currentIndex = 0;
  let imagesPerView = window.innerWidth <= 768 ? 1 : 3;

  function updateCarousel() {
    imagesPerView = window.innerWidth <= 768 ? 1 : 3;
    const offset = currentIndex * (images[0].offsetWidth + 16); // +gap
    track.style.transform = `translateX(-${offset}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < images.length - imagesPerView) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  window.addEventListener("resize", updateCarousel);

  updateCarousel();
});

// Testimonials slider with swipe
document.addEventListener("DOMContentLoaded", function () {
  const testimonialTrack = document.querySelector(".testimonial-track");
  const testimonialItems = document.querySelectorAll(".testimonial");
  const testimonialPrev = document.querySelector(".testimonial-btn.prev");
  const testimonialNext = document.querySelector(".testimonial-btn.next");

  let testimonialIndex = 0;
  let autoSlideInterval;
  let startX = 0, currentX = 0, isDragging = false;

  function updateTestimonials(smooth = true) {
    const slideWidth = testimonialItems[0].getBoundingClientRect().width;
    testimonialTrack.style.transition = smooth ? "transform 0.3s ease" : "none";
    testimonialTrack.style.transform = `translateX(-${testimonialIndex * slideWidth}px)`;
  }

  function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
    updateTestimonials();
  }

  function prevTestimonial() {
    testimonialIndex = (testimonialIndex - 1 + testimonialItems.length) % testimonialItems.length;
    updateTestimonials();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextTestimonial, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  testimonialNext.addEventListener("click", () => {
    stopAutoSlide();
    nextTestimonial();
    startAutoSlide();
  });

  testimonialPrev.addEventListener("click", () => {
    stopAutoSlide();
    prevTestimonial();
    startAutoSlide();
  });

  testimonialTrack.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    stopAutoSlide();
    testimonialTrack.style.transition = "none";
  });

  testimonialTrack.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    const slideWidth = testimonialItems[0].getBoundingClientRect().width;
    testimonialTrack.style.transform = `translateX(${deltaX - testimonialIndex * slideWidth * -1}px)`;
  });

  testimonialTrack.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = currentX - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) nextTestimonial();
      else prevTestimonial();
    } else {
      updateTestimonials();
    }
    startAutoSlide();
  });

  window.addEventListener("resize", () => updateTestimonials(false));

  updateTestimonials();
  startAutoSlide();
});
