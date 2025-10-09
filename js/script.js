document.addEventListener("DOMContentLoaded", function () {
  // =======================
  // Contact Form
  // =======================
  const form = document.getElementById("contactForm");
  const thankYouPopup = document.getElementById("thankYouPopup");
  const closePopupBtn = document.getElementById("closePopupBtn");

  if (form && thankYouPopup) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch("https://formsubmit.co/ajax/florahubflowers@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Show popup
          thankYouPopup.style.display = "flex";
          form.reset();

          // Auto close after 3 seconds
          setTimeout(() => {
            thankYouPopup.style.display = "none";
          }, 3000);
        })
        .catch((error) => console.error("Error:", error));
    });

    // Close popup manually (if button exists)
    if (closePopupBtn) {
      closePopupBtn.addEventListener("click", () => {
        thankYouPopup.style.display = "none";
      });
    }
  }

  // =======================
  // Toggle Menu (Overlay)
  // =======================
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  if (menuToggle && menuOverlay && menuClose) {
    menuToggle.addEventListener("click", () => {
      menuOverlay.classList.add("open");
    });

    menuClose.addEventListener("click", () => {
      menuOverlay.classList.remove("open");
    });

    menuOverlay.addEventListener("click", (e) => {
      if (e.target === menuOverlay) {
        menuOverlay.classList.remove("open");
      }
    });
  }

  // =======================
  // Gallery / Modal Viewer
  // =======================
  const images = document.querySelectorAll(".clickable-image");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;

  if (modal && modalImg && images.length > 0) {
    function openModal(index) {
      modal.style.display = "block";
      modalImg.src = images[index].src;
      currentIndex = index;

      if (menuToggle) menuToggle.style.display = "none";
    }

    function closeModal() {
      modal.style.display = "none";
      if (menuToggle) menuToggle.style.display = "block";
    }

    images.forEach((img, index) => {
      img.addEventListener("click", () => openModal(index));
    });

    if (nextBtn)
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
      });

    if (prevBtn)
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
      });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
      }
      if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
      }
      if (e.key === "Escape") closeModal();
    });
  }

  // =======================
  // Masonry Layout
  // =======================
  const grid = document.querySelector(".gallery-grid");
  if (grid) {
    const items = document.querySelectorAll(".gallery-item");
    items.forEach((item) => {
      const img = item.querySelector("img");
      img.onload = () => {
        const rowHeight = parseInt(
          getComputedStyle(grid).getPropertyValue("grid-auto-rows")
        );
        const rowGap = parseInt(getComputedStyle(grid).getPropertyValue("gap"));
        const rowSpan = Math.ceil(
          (img.getBoundingClientRect().height + rowGap) /
            (rowHeight + rowGap)
        );
        item.style.setProperty("--row-span", rowSpan);
      };
      if (img.complete) img.onload();
    });
  }
});
