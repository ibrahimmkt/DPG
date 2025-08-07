
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("show");

    const expanded =
      hamburger.getAttribute("aria-expanded") === "true" || false;
    hamburger.setAttribute("aria-expanded", !expanded);
  });

   document.querySelectorAll(".fullscreen-img").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const src = this.getAttribute("href");

      const overlay = document.createElement("div");
      overlay.className = "fullscreen-overlay";

      const img = document.createElement("img");
      img.src = src;

      const closeBtn = document.createElement("button");
      closeBtn.className = "close-btn";
      closeBtn.innerHTML = "✕";
      closeBtn.addEventListener("click", () => {
        overlay.remove();
      });

      overlay.appendChild(img);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
    });
  });

  /*live status åpningstider*/

function updateOpenStatus() {
  const statusText = document.getElementById("open-status-text");
  const statusCountdown = document.getElementById("open-status-countdown");

  const now = new Date();
  const day = now.getDay(); // 0 = søndag, 1 = mandag, ..., 6 = lørdag
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const currentSeconds = hour * 3600 + minute * 60 + second;

  // Åpningstider
  const openHour = day === 0 ? 11 : 10; // Søndag åpner 11, ellers 10
  const openTime = openHour * 3600;
  const closeTime = 23 * 3600; // Alle dager stenger 23:00

  let isOpen = currentSeconds >= openTime && currentSeconds < closeTime;

  if (isOpen) {
    const secondsUntilClose = closeTime - currentSeconds;
    const timeStr = formatCountdown(secondsUntilClose);
    statusText.textContent = `✅ Vi har åpent nå!`;
    statusCountdown.textContent = `Stenger om ${timeStr}`;
    statusText.classList.remove("closed");
    statusCountdown.classList.remove("closed");
  } else {
    let secondsUntilOpen = 0;
    if (currentSeconds < openTime) {
      // Åpner senere i dag
      secondsUntilOpen = openTime - currentSeconds;
    } else {
      // Åpner i morgen
      const nextDay = (day + 1) % 7;
      const nextOpenHour = nextDay === 0 ? 11 : 10;
      secondsUntilOpen =
        24 * 3600 - currentSeconds + nextOpenHour * 3600;
    }
    const timeStr = formatCountdown(secondsUntilOpen);
    statusText.textContent = `❌ Vi har stengt nå.`;
    statusCountdown.textContent = `Åpner om ${timeStr}`;
    statusText.classList.add("closed");
    statusCountdown.classList.add("closed");
  }
}

function formatCountdown(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${pad(hrs)}t ${pad(mins)}m ${pad(secs)}s`;
}

function pad(n) {
  return n < 10 ? "0" + n : n;
}

document.addEventListener("DOMContentLoaded", () => {
  updateOpenStatus();
  setInterval(updateOpenStatus, 1000);
});

/*kontaktskjema*/
function sendEmail(event) {
  event.preventDefault(); // Hindrer at siden lastes på nytt

  const firma = document.getElementById("firma").value;
  const kontaktperson = document.getElementById("kontaktperson").value;
  const telefon = document.getElementById("telefon").value;
  const epost = document.getElementById("epost").value;
  const melding = document.getElementById("melding").value;

  const subject = encodeURIComponent(`Henvendelse fra ${firma}`);
  const body = encodeURIComponent(
    `Firmanavn: ${firma}\n` +
    `Kontaktperson: ${kontaktperson}\n` +
    `Telefon: ${telefon}\n` +
    `E-post: ${epost}\n\n` +
    `Melding:\n${melding}`
  );

  // Åpner e-postklienten
  window.location.href = `mailto:drammenpizza@gmail.como?subject=${subject}&body=${body}`;
}

/*live status åpningstider
  function updateCountdown() {
    const countdownEl = document.getElementById("countdown");
    const deadline = new Date("July 31, 2025 23:59:59").getTime();
    const now = new Date().getTime();
    const diff = deadline - now;

    if (diff <= 0) {
      countdownEl.textContent = "❌ Tilbudet er utgått.";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.textContent = `Tilbudet er ferdig om ${days}d ${hours}t ${minutes}m ${seconds}s`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
*/

/*hjemmelevering poppup*/
function closePopup() {
  document.getElementById("deliveryPopup").style.display = "none";
}

window.addEventListener("load", () => {
  setTimeout(() => {
    const popup = document.getElementById("deliveryPopup");
    if (popup) popup.style.display = "block";

    // Auto-close after 10 seconds
    setTimeout(() => {
      if (popup) popup.style.display = "none";
    }, 100000);
  }, 1000); // Delay before showing the popup
});

/* ==============================================
   TILBAKE TIL TOPPEN FUNKSJONALITET
   ============================================== */

// Funksjon for tilbake til toppen-knapp
function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (!backToTopButton) return;

  // Vis/skjul knapp basert på scroll-posisjon
  function toggleButtonVisibility() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  }

  // Smooth scroll til toppen
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Event listeners
  window.addEventListener('scroll', toggleButtonVisibility);
  backToTopButton.addEventListener('click', scrollToTop);

  // Skjul knapp initialt
  toggleButtonVisibility();
}

// Initialiser når DOM er lastet
document.addEventListener('DOMContentLoaded', initBackToTop);

// Alternativ med animasjon (valgfritt)
function initBackToTopWithAnimation() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (!backToTopButton) return;

  function toggleButtonVisibility() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  }

  function scrollToTop() {
    // Legg til loading-animasjon
    backToTopButton.style.transform = 'scale(0.8)';
    
    const scrollToTopAnimation = () => {
      const currentPosition = window.pageYOffset;
      if (currentPosition > 0) {
        window.scrollTo(0, currentPosition - currentPosition / 8);
        requestAnimationFrame(scrollToTopAnimation);
      } else {
        // Tilbakestill knapp-animasjon
        backToTopButton.style.transform = '';
      }
    };
    
    requestAnimationFrame(scrollToTopAnimation);
  }

  window.addEventListener('scroll', toggleButtonVisibility);
  backToTopButton.addEventListener('click', scrollToTop);
  toggleButtonVisibility();
}

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  const quoteContainer = document.querySelector('.quote-text-container');
  observer.observe(quoteContainer);
  
        const menuCards = document.querySelectorAll(".menu-card");
      const fullMenus = document.querySelectorAll(".full-menu");
      const menuSelection = document.getElementById("menuSelection");

      menuCards.forEach((card) => {
        card.addEventListener("click", () => {
          const menuType = card.dataset.menu;
          showMenu(menuType);
        });
      });

      function showMenu(menuType) {
        // Skjul menu selection
        menuSelection.style.display = "none";

        // Skjul alle menyer først
        fullMenus.forEach((menu) => {
          menu.classList.remove("active");
        });

        // Vis valgt meny
        const selectedMenu = document.getElementById(menuType + "Menu");
        if (selectedMenu) {
          selectedMenu.classList.add("active");
        }
      }
      function closeMenu() {
        // Skjul alle full menyer
        fullMenus.forEach((menu) => {
          menu.classList.remove("active");
        });

        // Vis menu selection igjen
        menuSelection.style.display = "grid";

        // Scroll til toppen
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Legg til keyboard support
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeMenu();
        }
      });

      // Smooth scroll effekt
      document.addEventListener("DOMContentLoaded", () => {
        const cards = document.querySelectorAll(".menu-card");
        cards.forEach((card, index) => {
          card.style.opacity = "0";
          card.style.transform = "translateY(50px)";

          setTimeout(() => {
            card.style.transition = "all 0.6s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, index * 200);
        });
      });

         function toggleMeny(id) {
        const meny = document.getElementById(id);
        meny.style.display = meny.style.display === "none" ? "flex" : "none";
      }

      /* ringeknapp */
document.addEventListener("DOMContentLoaded", function () {
  const orderBtn = document.getElementById("orderBtn");
  const modal = document.getElementById("phoneModal");
  const closeBtn = modal.querySelector(".close-btn");
  const modalCloseButton = document.getElementById("modalCloseBtn");

  orderBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  // Lukk modal når man klikker på X
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Lukk modal når man klikker på Lukk-knappen
  modalCloseButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Lukk modal når man klikker utenfor modal-innholdet
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Optional: Lukk modal med ESC-tast
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
});
