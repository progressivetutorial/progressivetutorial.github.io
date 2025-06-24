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
    if (window.scrollY > 100) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
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

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const images = document.querySelectorAll(".carousel-img");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  let currentIndex = 0;
  const imagesPerView = window.innerWidth <= 768 ? 1 : 3;

  function updateCarousel() {
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

  window.addEventListener("resize", () => {
    updateCarousel();
  });

  updateCarousel(); // initial positioning
});

