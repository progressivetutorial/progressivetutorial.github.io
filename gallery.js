document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".gallery-grid img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  // Make sure all required elements exist
  if (images.length && lightbox && lightboxImg) {
    images.forEach((img) => {
      img.addEventListener("click", function () {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        document.body.style.overflow = "hidden"; // Prevent background scroll
      });
    });

    // Close lightbox on click
    lightbox.addEventListener("click", function () {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto"; // Restore scroll
    });
  } else {
    console.warn("Gallery or lightbox elements not found.");
  }

  // Hamburger menu toggle
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});
