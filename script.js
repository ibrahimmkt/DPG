
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
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const currentSeconds = hour * 3600 + minute * 60 + second;

  const openTime = 10 * 3600;  // 10:00
  const closeTime = 22 * 3600; // 22:00

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
      secondsUntilOpen = openTime - currentSeconds;
    } else {
      secondsUntilOpen = 24 * 3600 - currentSeconds + openTime;
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
  window.location.href = `mailto:kontakt@namnam.no?subject=${subject}&body=${body}`;
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