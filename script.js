'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// submit contact form (GitHub Pages -> Google Apps Script Web App)
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const action = form.getAttribute("action") || "";
    if (action.includes("REPLACE_ME")) {
      if (formStatus) {
        formStatus.style.display = "block";
        formStatus.style.color = "#FFD700";
        formStatus.textContent =
          "Contact form isn't configured yet. Deploy the Google Apps Script Web App and paste its /exec URL into the form action.";
      }
      return;
    }

    try {
      formBtn?.setAttribute("disabled", "");
      if (formStatus) {
        formStatus.style.display = "block";
        formStatus.style.color = "#FFD700";
        formStatus.textContent = "Sending...";
      }

      const formData = new FormData(form);
      const res = await fetch(action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Request failed");

      form.reset();
      formBtn?.setAttribute("disabled", "");
      if (formStatus) {
        formStatus.style.display = "block";
        formStatus.style.color = "#66B2FF";
        formStatus.textContent = "Message sent. Thanks!";
      }
    } catch (err) {
      if (formStatus) {
        formStatus.style.display = "block";
        formStatus.style.color = "#FF6B6B";
        formStatus.textContent =
          "Something went wrong sending your message. Please email me directly.";
      }
      // Re-enable button if form still valid
      if (form.checkValidity()) formBtn?.removeAttribute("disabled");
    }
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}