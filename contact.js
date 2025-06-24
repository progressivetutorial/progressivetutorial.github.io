// Mobile navbar toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    status.style.display = "none"; // Reset

    const data = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(data.entries()));

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      if (res.ok) {
        status.textContent = "Thank you! Your message has been sent.";
        status.className = "form-status success";
        status.style.display = "block";
        form.reset();
      } else {
        throw new Error("Failed to send");
      }
    } catch (err) {
      status.textContent = "Oops! Something went wrong. Please try again.";
      status.className = "form-status error";
      status.style.display = "block";
    }
  });
});
