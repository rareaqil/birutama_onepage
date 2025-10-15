// Basic interactivity: mobile nav, services modal, counters, testimonial slider
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");
  hamburger &&
    hamburger.addEventListener("click", function () {
      mainNav.classList.toggle("open");
      document.body.classList.toggle("no-scroll");
      // toggle visibility of links
      const links = mainNav.querySelectorAll("a");
      links.forEach(
        (a) =>
          (a.style.display =
            a.style.display === "inline-block" ? "none" : "inline-block"),
      );
    });

  // Contact CTA scroll
  document.querySelectorAll("#contactBtn, #ctaContact").forEach((btn) => {
    btn &&
      btn.addEventListener("click", function () {
        document
          .getElementById("contact")
          .scrollIntoView({ behavior: "smooth" });
      });
  });

  // Services modal
  const modal = document.getElementById("serviceModal");
  const modalContent = document.getElementById("modalContent");
  const openBtns = document.querySelectorAll(".open-service");
  const closeBtn = document.getElementById("modalClose");
  openBtns.forEach((b) => {
    b.addEventListener("click", function () {
      const id = this.getAttribute("data-service");
      modal.setAttribute("aria-hidden", "false");
      modalContent.innerHTML =
        "<h4>Service " +
        id +
        "</h4><p>Detail dari layanan nomor " +
        id +
        " — kami menyediakan solusi lengkap dan konsultasi profesional.</p>";
    });
  });
  closeBtn &&
    closeBtn.addEventListener("click", () =>
      modal.setAttribute("aria-hidden", "true"),
    );
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.setAttribute("aria-hidden", "true");
  });

  // Counters
  const counters = document.querySelectorAll(".stat-num");
  let started = false; // supaya hanya jalan sekali

  const startCounting = () => {
    counters.forEach((c) => {
      const target = +c.getAttribute("data-target");
      let count = 0;
      const step = Math.ceil(target / 60);
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          c.textContent = target;
          clearInterval(interval);
        } else {
          c.textContent = count;
        }
      }, 20);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          startCounting();
        }
      });
    },
    {
      threshold: 0.4, // mulai kalau 40% section kelihatan
    },
  );

  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Testimonial slider
  let current = 0;
  const slides = document.querySelectorAll(".slide");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  function show(i) {
    slides.forEach((s) => s.classList.remove("active"));
    slides[i].classList.add("active");
  }
  prev &&
    prev.addEventListener("click", () => {
      current = (current - 1 + slides.length) % slides.length;
      show(current);
    });
  next &&
    next.addEventListener("click", () => {
      current = (current + 1) % slides.length;
      show(current);
    });
  setInterval(() => {
    current = (current + 1) % slides.length;
    show(current);
  }, 5000);

  // === HERO IMAGE CAROUSEL WITH DOTS ===
  let heroIndex = 0;
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroDots = document.querySelectorAll(".hero-dots .dot");

  function showHeroSlide(index) {
    heroSlides.forEach((slide) => slide.classList.remove("active"));
    heroDots.forEach((dot) => dot.classList.remove("active"));

    heroSlides[index].classList.add("active");
    heroDots[index].classList.add("active");
    heroIndex = index;
  }

  // otomatis berganti setiap 4 detik
  setInterval(() => {
    const nextIndex = (heroIndex + 1) % heroSlides.length;
    showHeroSlide(nextIndex);
  }, 4000);

  // klik manual (opsional)
  heroDots.forEach((dot, i) => {
    dot.addEventListener("click", () => showHeroSlide(i));
  });
});
