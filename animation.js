/* ===========================
   animation.js
   Scroll-triggered animations
   =========================== */

// Pilih semua elemen yang punya kelas animasi
const animatedEls = document.querySelectorAll(
  ".fade-in, .slide-up, .slide-left, .slide-right, .zoom-in, .zoom-out, .rotate-in, .flip-x, .flip-y, .fade-slide-up, .fade-slide-left, .fade-slide-right, .fade-zoom-in, .fade-zoom-out",
);

// Buat observer untuk deteksi saat elemen masuk viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        // Optional: stop observing kalau mau animasi hanya sekali
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

// Mulai observe setiap elemen
animatedEls.forEach((el) => observer.observe(el));
