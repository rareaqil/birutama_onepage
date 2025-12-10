// Basic interactivity: mobile nav, services modal, counters, testimonial slider
document.addEventListener("DOMContentLoaded", () => {
  if (!location.hash) {
    location.hash = "#home"; // otomatis pindah ke #home
  }
});
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    const links = document.querySelectorAll("#mainNav a");
    links.forEach((a) => (a.style.display = ""));
    mainNav.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }
});
// function setAppHeight() {
//   document.documentElement.style.setProperty(
//     "--app-height",
//     `${window.innerHeight}px`,
//   );
// }

// window.addEventListener("resize", setAppHeight);
// setAppHeight();

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

  // 🧩 Tambahkan konten untuk tiap layanan di sini:
  const serviceDetails = {
    1: {
      title: "Dokumen Lingkungan",
      content: `
      <p>
        Kami menyediakan layanan penyusunan dokumen lingkungan seperti:
      </p>
      <ul>
        <li>AMDAL (Analisis Mengenai Dampak Lingkungan)</li>
        <li>DELH (Dokumen Evaluasi Lingkungan Hidup)</li>
        <li>UKL–UPL (Upaya Pengelolaan & Pemantauan Lingkungan)</li>
        <li>RKL-RPL Rinci (Rencana Pengelolaan dan Rencana Pemantauan Lingkungan Hidup Rinci)</li>
        <li>SPPL (Surat Pernyataan Pengelolaan Lingkungan)</li>
      </ul>
      <p>
        Semua proses dilakukan sesuai regulasi terbaru dari Kementerian Lingkungan Hidup (KLH). Kami memastikan setiap dokumen memenuhi standar teknis dan hukum, serta mendukung keberlanjutan proyek Anda.
      </p>
    `,
    },
    2: {
      title: "Pelaporan Pengelolaan",
      content: `
      <p>
        Layanan ini membantu perusahaan Anda dalam menyusun dan mengelola laporan
        pengelolaan lingkungan seperti:
      </p>
      <ul>
        <li>Laporan RKL-RPL (Rencana Pengelolaan & Pemantauan Lingkungan)</li>
        <li>Laporan Monitoring triwulan dan setiap semester</li>
      </ul>
      <p>
        Laporan Monitoring triwulan dan setiap semester
Kami berpengalaman dengan platform digital untuk dalam proses pelaporan, akurasi data, dan kepatuhan terhadap regulasi.
      </p>
    `,
    },
    3: {
      title: "Tata Lingkungan",
      content: `
      <p>
        Kami menawarkan solusi tata kelola lingkungan yang mencakup:
      </p>
      <ul>
        <li>Audit lingkungan dan evaluasi kepatuhan</li>
        <li>Perencanaan tata ruang hijau dan konservasi</li>
        <li>Penerapan sistem manajemen lingkungan (ISO 14001)</li>
      </ul>
      <p>
        Dengan pendekatan berbasis data dan pengalaman praktis, kami membantu
        perusahaan mengoptimalkan efisiensi lingkungan serta mencapai target ESG.
      </p>
    `,
    },
  };

  openBtns.forEach((b) => {
    b.addEventListener("click", function () {
      const id = this.getAttribute("data-service");
      const detail = serviceDetails[id];

      // Jika ada datanya, tampilkan konten sesuai
      if (detail) {
        modalContent.innerHTML = `
        <h4>${detail.title}</h4>
        ${detail.content}
      `;
      } else {
        // fallback kalau belum ada konten
        modalContent.innerHTML = `
        <h4>Service ${id}</h4>
        <p>Detail layanan sedang disiapkan.</p>
      `;
      }

      modal.setAttribute("aria-hidden", "false");
    });
  });

  // Tutup modal
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

  // // Modal Portofolio
  // const portfolioModal = document.getElementById("portfolioModal");
  // const portfolioContent = document.getElementById("portfolioContent");
  // const closePortfolio = document.getElementById("portfolioClose");

  // // Data project
  // const portfolioDetails = {
  //   1: {
  //     title: "Service - Dokumen Lingkungan",
  //     image: "assets/photos/header_2.png",
  //     desc: "Kegiatan Workshop Penyusunan dokumen lingkungan untuk proyek industri pertambangan, kehutanan, manufaktur, migas, dan sebagainya.",
  //   },
  //   2: {
  //     title: "Service - Dokumen Lingkungan",
  //     image: "assets/photos/porto_2.jpg",
  //     desc: "Kegiatan Workshop Penyusunan dokumen lingkungan untuk proyek industri pertambangan, kehutanan, manufaktur, migas, dan sebagainya.",
  //   },
  //   3: {
  //     title: "Pelaporan Digital",
  //     image: "assets/portfolio3.svg",
  //     desc: "Platform otomatisasi pelaporan PROPER dan RKL-RPL dengan integrasi sistem internal.",
  //   },
  //   4: {
  //     title: "Pemantauan Air",
  //     image: "assets/portfolio4.svg",
  //     desc: "Proyek IoT pemantauan kualitas air dengan sensor dan dashboard visualisasi.",
  //   },
  //   5: {
  //     title: "Audit Lingkungan",
  //     image: "assets/portfolio5.svg",
  //     desc: "Pelaksanaan audit kepatuhan dan sertifikasi ISO 14001 bagi sektor energi.",
  //   },
  //   6: {
  //     title: "Konsultasi ESG",
  //     image: "assets/portfolio6.svg",
  //     desc: "Pendampingan implementasi ESG dan penyusunan laporan keberlanjutan (sustainability report).",
  //   },
  // };

  // // Event untuk tiap tile
  // document.querySelectorAll(".tile").forEach((tile) => {
  //   tile.addEventListener("click", () => {
  //     const id = tile.getAttribute("data-portfolio");
  //     const item = portfolioDetails[id];
  //     portfolioContent.innerHTML = `
  //     <img src="${item.image}" alt="${item.title}">
  //     <h4>${item.title}</h4>
  //     <p>${item.desc}</p>
  //   `;
  //     portfolioModal.setAttribute("aria-hidden", "false");
  //   });
  // });

  // // Close modal
  // closePortfolio.addEventListener("click", () =>
  //   portfolioModal.setAttribute("aria-hidden", "true"),
  // );
  // portfolioModal.addEventListener("click", (e) => {
  //   if (e.target === portfolioModal)
  //     portfolioModal.setAttribute("aria-hidden", "true");
  // });

  const portfolioModal = document.getElementById("portfolioModal");
  const mainImage = document.getElementById("mainImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const thumbnailsContainer = document.getElementById("portfolioThumbnails");
  const closePortfolio = document.getElementById("portfolioClose");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentImages = [];
  let currentIndex = 0;

  // Data project
  const portfolioDetails = {
    1: {
      title: "Service - Dokumen Lingkungan",
      images: [
        "assets/photos/header_2.png",
        "assets/photos/porto_1-2.jpg",
        "assets/photos/porto_1-3.jpg",
      ],
      desc: "Kegiatan Workshop Penyusunan dokumen lingkungan untuk proyek industri pertambangan, kehutanan, manufaktur, migas, dan sebagainya.",
    },
    2: {
      title: "Service - Dokumen Lingkungan",
      images: [
        "assets/photos/porto_2.jpg",
        "assets/photos/porto_2-2.jpg",
        "assets/photos/porto_2-3.jpg",
        "assets/photos/porto_2-4.jpg",
      ],
      desc: "Kegiatan Workshop Penyusunan dokumen lingkungan untuk proyek industri pertambangan, kehutanan, manufaktur, migas, dan sebagainya.",
    },
    // 3: {
    //   title: "Pemantauan Air",
    //   images: ["assets/portfolio4.svg", "assets/portfolio_extra_3.jpg"],
    //   desc: "Proyek IoT pemantauan kualitas air dengan sensor dan dashboard visualisasi.",
    // },
    // 4: {
    //   title: "Audit Lingkungan",
    //   images: ["assets/portfolio5.svg", "assets/portfolio_extra_4.jpg"],
    //   desc: "Pelaksanaan audit kepatuhan dan sertifikasi ISO 14001 bagi sektor energi.",
    // },
    // 5: {
    //   title: "Konsultasi ESG",
    //   images: ["assets/portfolio6.svg", "assets/portfolio_extra_5.jpg"],
    //   desc: "Pendampingan implementasi ESG dan penyusunan laporan keberlanjutan (sustainability report).",
    // },
  };

  // Event tiap tile
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      const id = tile.getAttribute("data-portfolio");
      const item = portfolioDetails[id];

      modalTitle.textContent = item.title;
      modalDesc.textContent = item.desc;
      currentImages = item.images;
      currentIndex = 0;
      mainImage.src = currentImages[currentIndex];

      // Buat thumbnail
      thumbnailsContainer.innerHTML = "";
      currentImages.forEach((img, index) => {
        const thumb = document.createElement("img");
        thumb.src = img;
        if (index === 0) thumb.classList.add("active");
        thumb.addEventListener("click", () => {
          currentIndex = index;
          updateMainImage();
        });
        thumbnailsContainer.appendChild(thumb);
      });

      portfolioModal.setAttribute("aria-hidden", "false");
    });
  });

  // Fungsi update main image & active thumbnail
  function updateMainImage() {
    mainImage.src = currentImages[currentIndex];
    thumbnailsContainer.querySelectorAll("img").forEach((t, i) => {
      t.classList.toggle("active", i === currentIndex);
    });
  }

  // Tombol prev/next
  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateMainImage();
  });
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateMainImage();
  });

  // Close modal
  closePortfolio.addEventListener("click", () =>
    portfolioModal.setAttribute("aria-hidden", "true"),
  );
  portfolioModal.addEventListener("click", (e) => {
    if (e.target === portfolioModal)
      portfolioModal.setAttribute("aria-hidden", "true");
  });

  // Optional: zoom in/out main image
  let zoomed = false;
  mainImage.addEventListener("click", () => {
    if (!zoomed) {
      mainImage.style.maxHeight = "80vh";
      mainImage.style.cursor = "zoom-out";
    } else {
      mainImage.style.maxHeight = "400px";
      mainImage.style.cursor = "zoom-in";
    }
    zoomed = !zoomed;
  });

  // // Testimonial slider
  // let current = 0;
  // const slides = document.querySelectorAll(".slide");
  // const prev = document.getElementById("prev");
  // const next = document.getElementById("next");
  // function show(i) {
  //   slides.forEach((s) => s.classList.remove("active"));
  //   slides[i].classList.add("active");
  // }
  // prev &&
  //   prev.addEventListener("click", () => {
  //     current = (current - 1 + slides.length) % slides.length;
  //     show(current);
  //   });
  // next &&
  //   next.addEventListener("click", () => {
  //     current = (current + 1) % slides.length;
  //     show(current);
  //   });
  // setInterval(() => {
  //   current = (current + 1) % slides.length;
  //   show(current);
  // }, 5000);

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
  }, 6000);

  // klik manual (opsional)
  heroDots.forEach((dot, i) => {
    dot.addEventListener("click", () => showHeroSlide(i));
  });

  // Contact form submission
  document.getElementById("sendEmail").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const mailtoLink = `mailto:info@birutamaenvitech.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
    )}`;
    window.location.href = mailtoLink;
  });

  document.getElementById("sendWA").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const waNumber = "6285292963333"; // gunakan format internasional tanpa +

    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
      `Halo, saya ${name}.\n\nSaya ingin menanyakan mengenai: ${subject}\n\n${message}`,
    )}`;
    window.open(waLink, "_blank");
  });
});
