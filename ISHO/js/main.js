(function () {
  "use strict";
  document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
      console.warn('Image failed to load:', e.target.src);
      e.target.style.opacity = '1'; 
      e.target.alt = e.target.alt || 'Image unavailable';
    }
  }, true);

  document.addEventListener('DOMContentLoaded', function() {
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
      if (!img.style.opacity) {
        img.style.opacity = '1';
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });

  const heroCarousel = document.getElementById("heroCarousel");
  if (heroCarousel) {
    const carousel = new bootstrap.Carousel(heroCarousel, {
      interval: 5000,
      ride: "carousel",
      pause: "hover",
      touch: true,
      keyboard: true,
    });

    heroCarousel.addEventListener("focusin", () => {
      carousel.pause();
    });

    heroCarousel.addEventListener("focusout", () => {
      carousel.cycle();
    });
  }

  function initWishlistButtons() {
    const wishlistButtons = document.querySelectorAll(".btn-wishlist");

    wishlistButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const icon = this.querySelector("i");
        const isActive = icon.classList.contains("bi-heart-fill");

        if (isActive) {
          icon.classList.remove("bi-heart-fill");
          icon.classList.add("bi-heart");
          this.setAttribute("aria-label", "Add to wishlist");

          showNotification("Removed from wishlist");
        } else {
          icon.classList.remove("bi-heart");
          icon.classList.add("bi-heart-fill");
          this.setAttribute("aria-label", "Remove from wishlist");

          showNotification("Added to wishlist");
        }

        saveWishlistState(this.dataset.artworkId, !isActive);
      });
    });
  }

  function saveWishlistState(artworkId, isActive) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isActive) {
      if (!wishlist.includes(artworkId)) {
        wishlist.push(artworkId);
      }
    } else {
      wishlist = wishlist.filter((id) => id !== artworkId);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }

  function loadWishlistState() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    document.querySelectorAll(".btn-wishlist").forEach((button) => {
      const artworkId = button.dataset.artworkId;
      if (wishlist.includes(artworkId)) {
        const icon = button.querySelector("i");
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill");
        button.setAttribute("aria-label", "Remove from wishlist");
      }
    });
  }

  initWishlistButtons();
  loadWishlistState();

  const artistTabs = document.querySelectorAll('[data-bs-toggle="pill"]');

  artistTabs.forEach((tab) => {
    tab.addEventListener("shown.bs.tab", function (e) {
      const targetId = e.target.getAttribute("data-bs-target");
      const targetPanel = document.querySelector(targetId);

      if (targetPanel) {
        const announcement = document.createElement("div");
        announcement.setAttribute("role", "status");
        announcement.setAttribute("aria-live", "polite");
        announcement.className = "visually-hidden";
        announcement.textContent = `Showing ${e.target.textContent.trim()} artists`;
        document.body.appendChild(announcement);

        setTimeout(() => {
          announcement.remove();
        }, 1000);
      }
    });
  });

  const searchModal = document.getElementById("searchModal");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.querySelector(
    '[data-bs-target="#searchModal"]'
  );

  if (searchModal && searchInput) {
    searchModal.addEventListener("shown.bs.modal", function () {
      searchInput.focus();
    });

    const searchForm = searchModal.querySelector("form");
    if (searchForm) {
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const query = searchInput.value.trim();
        if (query) {
          performSearch(query);
        }
      });
    }

    searchModal.addEventListener("hidden.bs.modal", function () {
      searchInput.value = "";
    });
  }

  function performSearch(query) {
    console.log("Searching for:", query);

    showNotification(`Searching for "${query}"...`);

    // Simulate search
    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(searchModal);
      if (modal) {
        modal.hide();
      }
    }, 500);
  }

  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!validateEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        emailInput.focus();
        return;
      }

      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Subscribing...";

      subscribeToNewsletter(email)
        .then(() => {
          showNotification("Successfully subscribed to newsletter!", "success");
          emailInput.value = "";
        })
        .catch((error) => {
          showNotification("Subscription failed. Please try again.", "error");
          console.error("Newsletter subscription error:", error);
        })
        .finally(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        });
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function subscribeToNewsletter(email) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // API endpoint later
        resolve({ success: true });
      }, 1000);
    });
  }

  function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;

              if (!img.complete) {
                img.style.opacity = "0";
                img.style.transition = "opacity 0.3s ease";

                img.addEventListener("load", function () {
                  this.style.opacity = "1";
                }, { once: true });

                img.addEventListener("error", function () {
                  this.style.opacity = "1";
                  console.warn('Image failed to load:', this.src);
                }, { once: true });

                setTimeout(() => {
                  if (img.style.opacity === "0") {
                    img.style.opacity = "1";
                  }
                }, 3000);
              } else {
                img.style.opacity = "1";
              }

              observer.unobserve(img);
            }
          });
        },
        {
          rootMargin: "50px",
        }
      );

      images.forEach((img) => {
        if (img.complete) {
          img.style.opacity = "1";
        }
        imageObserver.observe(img);
      });
    } else {
      images.forEach((img) => {
        img.style.opacity = "1";
      });
    }
  }

  initLazyLoading();

  function showNotification(message, type = "info") {
    let toastContainer = document.getElementById("toastContainer");

    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toastContainer";
      toastContainer.className =
        "toast-container position-fixed bottom-0 end-0 p-3";
      toastContainer.style.zIndex = "9999";
      document.body.appendChild(toastContainer);
    }

    const toastId = `toast-${Date.now()}`;
    const toastHTML = `
      <div id="${toastId}" class="toast" role="alert" aria-live="polite" aria-atomic="true">
        <div class="toast-body d-flex align-items-center">
          <i class="bi bi-${
            type === "success"
              ? "check-circle"
              : type === "error"
              ? "exclamation-circle"
              : "info-circle"
          } me-2"></i>
          <span>${message}</span>
          <button type="button" class="btn-close ms-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML("beforeend", toastHTML);

    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, {
      autohide: true,
      delay: 3000,
    });

    toast.show();

    toastElement.addEventListener("hidden.bs.toast", function () {
      this.remove();
    });
  }

  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");
  const scrollThreshold = 10;

  if (navbar) {
    window.addEventListener(
      "scroll",
      function () {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
          navbar.classList.add("shadow-sm");
        } else {
          navbar.classList.remove("shadow-sm");
        }

        lastScrollTop = scrollTop;
      },
      { passive: true }
    );
  }

  const categoryCarousel = document.getElementById("categoryCarousel");
  if (categoryCarousel) {
    const carousel = new bootstrap.Carousel(categoryCarousel, {
      interval: 4000,
      ride: "carousel",
      pause: "hover",
      touch: true,
      keyboard: true,
    });
  }

  const skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.addEventListener("click", function (e) {
      e.preventDefault();
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.setAttribute("tabindex", "-1");
        mainContent.focus();
      }
    });
  }

  // Analytics Hooks
  function trackEvent(category, action, label, value) {
    if (typeof gtag !== "undefined") {
      gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    console.log("Analytics Event:", { category, action, label, value });
  }

  document.querySelectorAll(".artwork-card").forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector(".card-title")?.textContent;
      const price = this.querySelector(".card-price")?.textContent;
      trackEvent("Artwork", "Click", title, price);
    });
  });

  document.querySelectorAll(".artist-card a").forEach((link) => {
    link.addEventListener("click", function () {
      const artistName = this.textContent.trim();
      trackEvent("Artist", "Profile Click", artistName);
    });
  });

  document.querySelectorAll(".btn-tag").forEach((tag) => {
    tag.addEventListener("click", function () {
      const filterText = this.textContent.trim();
      trackEvent("Filter", "Click", filterText);
    });
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("shown.bs.modal", function () {
      const focusableElements = this.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      this.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    });
  });

  window.addEventListener("load", function () {
    document.body.classList.remove("loading");

    if ("performance" in window) {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log("Page Load Time:", pageLoadTime + "ms");
    }

    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
      if (!img.complete || img.naturalHeight === 0) {
        console.warn('Failed to load image:', img.src);
        img.style.opacity = "1"; 
      }
    });
  });

  console.log(
    "%c🎨 Platforms Art Gallery",
    "font-size: 20px; font-weight: bold; color: #d7b36c;"
  );
  console.log(
    "%cBuilt with ❤️ using Bootstrap 5.3",
    "font-size: 12px; color: #777777;"
  );
})();
