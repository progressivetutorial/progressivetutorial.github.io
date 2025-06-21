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
