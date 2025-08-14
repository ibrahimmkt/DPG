const hamburger = document.querySelector(".hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    // Toggle aktiv klasse på hamburger for animasjon
    hamburger.classList.toggle("active");
    
    // Toggle vis/skjul nav
    navMenu.classList.toggle("show");

    // Oppdater aria-expanded for tilgjengelighet
    const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
    hamburger.setAttribute("aria-expanded", !expanded);
    
    // Forhindre scrolling av body når nav er åpen
    if (navMenu.classList.contains("show")) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
  });

  // Lukk nav når man klikker på en lenke (mobil)
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("show");
      hamburger.setAttribute("aria-expanded", false);
      document.body.classList.remove("nav-open");
    });
  });

  // Lukk nav med ESC-tast
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("show")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("show");
      hamburger.setAttribute("aria-expanded", false);
      document.body.classList.remove("nav-open");
    }
  });

  // Lukk nav hvis vinduet endrer størrelse til desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu.classList.contains("show")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("show");
      hamburger.setAttribute("aria-expanded", false);
      document.body.classList.remove("nav-open");
    }
  });
}

// CSS for å forhindre scrolling når nav er åpen
const navOpenStyles = `
.nav-open {
  overflow: hidden !important;
  position: fixed !important;
  width: 100% !important;
}
`;

// Legg til CSS i head hvis den ikke finnes
if (!document.querySelector('#nav-open-styles')) {
  const style = document.createElement('style');
  style.id = 'nav-open-styles';
  style.textContent = navOpenStyles;
  document.head.appendChild(style);
}

/*live status åpningstider*/
function updateOpenStatus() {
  const statusText = document.getElementById("open-status-text");
  const statusCountdown = document.getElementById("open-status-countdown");

  if (!statusText || !statusCountdown) return;

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
  window.location.href = `mailto:drammenpizza@gmail.com?subject=${subject}&body=${body}`;
}

/*hjemmelevering poppup*/
function closePopup() {
  const popup = document.getElementById("deliveryPopup");
  if (popup) popup.style.display = "none";
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

// Quote animation
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
if (quoteContainer) {
  observer.observe(quoteContainer);
}

// Menu functionality
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
  if (menuSelection) menuSelection.style.display = "none";

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
  if (menuSelection) menuSelection.style.display = "grid";

  // Scroll til toppen
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// OPPDATERT TOGGLEMENY FUNKSJON MED BEDRE MOBIL-STØTTE
function toggleMeny(id) {
  const meny = document.getElementById(id);
  if (meny) {
    const isCurrentlyHidden = meny.style.display === "none" || !meny.style.display;
    
    if (isCurrentlyHidden) {
      meny.style.display = "flex";
      console.log(`Showing menu: ${id}`); // Debug info
      
      // Oppdater ARIA attributt
      const header = document.querySelector(`[aria-controls="${id}"]`);
      if (header) {
        header.setAttribute('aria-expanded', 'true');
      }
    } else {
      meny.style.display = "none";
      console.log(`Hiding menu: ${id}`); // Debug info
      
      // Oppdater ARIA attributt
      const header = document.querySelector(`[aria-controls="${id}"]`);
      if (header) {
        header.setAttribute('aria-expanded', 'false');
      }
    }
  }
}

// HELT NY OG ENKEL FUNKSJON: Klikk på meny-overskrifter (UNIVERSELL KOMPATIBILITET)
function initMenuHeaderClicks() {
  // Vent til DOM er fullstendig lastet
  setTimeout(() => {
    // Finn alle meny-kategori headers
    const pizzaHeader = document.querySelector('#pizza-kategori .menu-category-header h3');
    const grillHeader = document.querySelector('#grillmat-kategori .menu-category-header h3');
    const drikkeHeader = document.querySelector('#drikke-kategori .menu-category-header h3');

    // Pizza meny
    if (pizzaHeader) {
      makeHeaderClickable(pizzaHeader, 'pizza-retter', 'Pizza meny');
    }

    // Grill meny  
    if (grillHeader) {
      makeHeaderClickable(grillHeader, 'grillmat-retter', 'Grill meny');
    }

    // Drikke meny
    if (drikkeHeader) {
      makeHeaderClickable(drikkeHeader, 'drikke-retter', 'Drikke meny');
    }
  }, 500);
}

// Hjelpefunksjon for å gjøre headers klikkbare
function makeHeaderClickable(headerElement, menuId, menuName) {
  // Sett CSS-styling
  headerElement.style.cssText = `
    cursor: pointer !important;
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    -webkit-touch-callout: none !important;
    transition: all 0.2s ease !important;
  `;

  // Legg til en visuell indikator
  headerElement.title = `Klikk for å åpne/lukke ${menuName}`;

  // Hovedfunksjon som håndterer klikk
  function handleClick(event) {
    try {
      // Stopp alle andre events
      if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }

      console.log(`Attempting to toggle: ${menuId} for ${menuName}`);
      
      // Finn meny-elementet
      const menuElement = document.getElementById(menuId);
      
      if (menuElement) {
        // Enkel toggle-logikk
        const isHidden = menuElement.style.display === 'none' || 
                        getComputedStyle(menuElement).display === 'none' ||
                        !menuElement.style.display;
        
        if (isHidden) {
          menuElement.style.display = 'flex';
          console.log(`Opened: ${menuName}`);
          
          // Scroll til meny etter kort delay
          setTimeout(() => {
            menuElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 200);
          
        } else {
          menuElement.style.display = 'none';
          console.log(`Closed: ${menuName}`);
        }
      } else {
        console.error(`Menu element not found: ${menuId}`);
      }
      
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  }

  // Fjern alle eksisterende event listeners (cleanup)
  const newHeader = headerElement.cloneNode(true);
  headerElement.parentNode.replaceChild(newHeader, headerElement);
  
  // Legg til event listeners på det nye elementet
  newHeader.addEventListener('click', handleClick, true);
  newHeader.addEventListener('touchend', handleClick, true);
  
  // Visuell feedback på touch/hover
  newHeader.addEventListener('touchstart', function(e) {
    this.style.opacity = '0.7';
    this.style.transform = 'scale(0.98)';
  }, { passive: true });
  
  newHeader.addEventListener('touchend', function(e) {
    setTimeout(() => {
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    }, 100);
  }, { passive: true });
  
  // Hover-effekt for desktop
  newHeader.addEventListener('mouseenter', function() {
    if (!('ontouchstart' in window)) {
      this.style.opacity = '0.8';
    }
  });
  
  newHeader.addEventListener('mouseleave', function() {
    if (!('ontouchstart' in window)) {
      this.style.opacity = '1';
    }
  });

  console.log(`Made ${menuName} header clickable`);
}

/* ==============================================
   MODAL POPUP FOR TELEFONNUMMER - ALLE SIDER
   ============================================== */

function initPhoneModal() {
  const orderBtn = document.getElementById("orderBtn");
  const modal = document.getElementById("phoneModal");
  
  if (!orderBtn || !modal) return;

  const closeBtn = modal.querySelector(".close-btn");
  const modalCloseButton = document.getElementById("modalCloseBtn") || modal.querySelector(".modal-close-btn") || modal.querySelector(".modal-close-button");

  // Åpne modal når "Ring og Bestill" klikkes
  orderBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    // Fokus på modal for tilgjengelighet
    modal.focus();
  });

  // Lukk modal med X-knapp
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      closeModal();
    });
  }

  // Lukk modal med lukk-knappen
  if (modalCloseButton) {
    modalCloseButton.addEventListener("click", function () {
      closeModal();
    });
  }

  // Lukk modal når man klikker utenfor modal-innholdet
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Lukk modal med ESC-tast
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    // Returner fokus til knappen som åpnet modalen
    orderBtn.focus();
  }
}

/* ==============================================
   GOOGLE TRANSLATE – SPRÅKVELGER
   ============================================== */

// Denne funksjonen kalles av Google Translate scriptet
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'no',
      includedLanguages: 'no,en,ar',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    },
    'google_translate_element'
  );
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "no",
      includedLanguages: "no,en,ar,tr,fa,uk,pl,ur,so,lt,hi",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
}

// Etter at widgeten er lastet, legg til flagg-emoji
function addFlagsToDropdown() {
  const flagMap = {
    Norsk: "🇳🇴 Norsk",
    English: "🇬🇧 English",
    العربية: "🇸🇦 العربية",
    Türkçe: "🇹🇷 Türkçe",
    فارسی: "🇮🇷 فارسی",
    Українська: "🇺🇦 Українська",
    Polski: "🇵🇱 Polski",
    اردو: "🇵🇰 اردو",
    "Af-Soomaali": "🇸🇴 Af-Soomaali",
    Lietuvių: "🇱🇹 Lietuvių",
  };

  const interval = setInterval(() => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      for (let i = 0; i < select.options.length; i++) {
        const text = select.options[i].text;
        if (flagMap[text]) {
          select.options[i].text = flagMap[text];
        }
      }
      clearInterval(interval);
    }
  }, 500);
}

document.addEventListener("DOMContentLoaded", addFlagsToDropdown);

// Tilpasset knapp-klikk for å endre språk
function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.custom-lang-switcher button');
  langButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      const select = document.querySelector("#google_translate_element select");
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
      }
    });
  });
}

/* ==============================================
   INITIALISER ALT NÅR DOM ER LASTET
   ============================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Initialiser åpningstider status
  updateOpenStatus();
  setInterval(updateOpenStatus, 1000);
  
  // Initialiser tilbake til toppen knapp
  initBackToTop();
  
  // Initialiser telefon modal
  initPhoneModal();
  
  // NYTT: Initialiser klikk på meny-overskrifter med forsinkelse
  setTimeout(() => {
    initMenuHeaderClicks();
    console.log("Menu header clicks initialized");
  }, 1000);

  // NYTT: Initialiser søkefunksjonalitet
  setTimeout(() => {
    initializeSearch();
    console.log("Search functionality initialized");
  }, 1500);

  // Legg til keyboard support for menyer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  // Smooth scroll effekt for menu cards
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

  // EKSTRA SIKKERHET: Legg til backup event listeners etter alt annet er lastet
  setTimeout(() => {
    // Backup for pizza meny
    const pizzaH3 = document.querySelector('#pizza-kategori h3');
    if (pizzaH3 && !pizzaH3.dataset.clickable) {
      pizzaH3.addEventListener('click', () => toggleMeny('pizza-retter'));
      pizzaH3.dataset.clickable = 'true';
      pizzaH3.style.cursor = 'pointer';
    }
    
    // Backup for grill meny
    const grillH3 = document.querySelector('#grillmat-kategori h3');
    if (grillH3 && !grillH3.dataset.clickable) {
      grillH3.addEventListener('click', () => toggleMeny('grillmat-retter'));
      grillH3.dataset.clickable = 'true';
      grillH3.style.cursor = 'pointer';
    }
    
    // Backup for drikke meny
    const drikkeH3 = document.querySelector('#drikke-kategori h3');
    if (drikkeH3 && !drikkeH3.dataset.clickable) {
      drikkeH3.addEventListener('click', () => toggleMeny('drikke-retter'));
      drikkeH3.dataset.clickable = 'true';
      drikkeH3.style.cursor = 'pointer';
    }
    
    console.log("Backup event listeners added");
  }, 2000);
});