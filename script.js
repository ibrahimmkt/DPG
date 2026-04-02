/* ================================
   HAMBURGER / NAV
   ================================ */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("show");

    const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
    hamburger.setAttribute("aria-expanded", !expanded);

    if (navMenu.classList.contains("show")) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
  });

  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("show");
      hamburger.setAttribute("aria-expanded", false);
      document.body.classList.remove("nav-open");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("show")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("show");
      hamburger.setAttribute("aria-expanded", false);
      document.body.classList.remove("nav-open");
    }
  });

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
if (!document.querySelector('#nav-open-styles')) {
  const style = document.createElement('style');
  style.id = 'nav-open-styles';
  style.textContent = navOpenStyles;
  document.head.appendChild(style);
}

/* ================================
   LIVE STATUS ÅPNINGSTIDER
   (11–23 alle dager, matcher schema)
   ================================ */
function updateOpenStatus() {
  const statusText = document.getElementById("open-status-text");
  const statusCountdown = document.getElementById("open-status-countdown");
  if (!statusText || !statusCountdown) return;

  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const currentSeconds = hour * 3600 + minute * 60 + second;

  const openHour = 11;            // Åpner 11 alle dager
  const closeHour = 23;           // Stenger 23 alle dager
  const openTime = openHour * 3600;
  const closeTime = closeHour * 3600;

  const isOpen = currentSeconds >= openTime && currentSeconds < closeTime;

  if (isOpen) {
    const secondsUntilClose = closeTime - currentSeconds;
    statusText.textContent = `✅ Vi har åpent nå!`;
    statusCountdown.textContent = `Stenger om ${formatCountdown(secondsUntilClose)}`;
    statusText.classList.remove("closed");
    statusCountdown.classList.remove("closed");
  } else {
    let secondsUntilOpen = 0;
    if (currentSeconds < openTime) {
      secondsUntilOpen = openTime - currentSeconds;     // Åpner senere i dag
    } else {
      secondsUntilOpen = (24 * 3600 - currentSeconds) + openTime; // Åpner i morgen 11
    }
    statusText.textContent = `❌ Vi har stengt nå.`;
    statusCountdown.textContent = `Åpner om ${formatCountdown(secondsUntilOpen)}`;
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
function pad(n) { return n < 10 ? "0" + n : n; }

/* ================================
   KONTAKTSKJEMA (mailto)
   ================================ */
function sendEmail(event) {
  event.preventDefault();
  const firma = document.getElementById("firma")?.value || "";
  const kontaktperson = document.getElementById("kontaktperson")?.value || "";
  const telefon = document.getElementById("telefon")?.value || "";
  const epost = document.getElementById("epost")?.value || "";
  const melding = document.getElementById("melding")?.value || "";

  const subject = encodeURIComponent(`Henvendelse fra ${firma}`);
  const body = encodeURIComponent(
    `Firmanavn: ${firma}\n` +
    `Kontaktperson: ${kontaktperson}\n` +
    `Telefon: ${telefon}\n` +
    `E-post: ${epost}\n\n` +
    `Melding:\n${melding}`
  );

  window.location.href = `mailto:drammenpizza@gmail.com?subject=${subject}&body=${body}`;
}

/* ================================
   HJEMMELEVERING POPUP
   ================================ */
function closePopup() {
  const popup = document.getElementById("deliveryPopup");
  if (popup) popup.style.display = "none";
}
window.addEventListener("load", () => {
  setTimeout(() => {
    const popup = document.getElementById("deliveryPopup");
    if (popup) popup.style.display = "block";

    // Auto-close etter 100s (juster fritt)
    setTimeout(() => {
      if (popup) popup.style.display = "none";
    }, 100000);
  }, 1000);
});

/* ================================
   TILBAKE TIL TOPPEN
   ================================ */
function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  if (!backToTopButton) return;

  function toggleButtonVisibility() {
    if (window.pageYOffset > 300) backToTopButton.classList.add('show');
    else backToTopButton.classList.remove('show');
  }
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.addEventListener('scroll', toggleButtonVisibility);
  backToTopButton.addEventListener('click', scrollToTop);
  toggleButtonVisibility();
}

/* ================================
   QUOTE ANIMASJON
   ================================ */
const observer = new IntersectionObserver(
  (entries) => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }),
  { threshold: 0.5 }
);
const quoteContainer = document.querySelector('.quote-text-container');
if (quoteContainer) observer.observe(quoteContainer);

/* ================================
   MENY-KORT / VIS FULL MENY
   ================================ */
const menuCards = document.querySelectorAll(".menu-card");
const fullMenus = document.querySelectorAll(".full-menu");
const menuSelection = document.getElementById("menuSelection");

menuCards.forEach((card) => {
  card.addEventListener("click", () => showMenu(card.dataset.menu));
});

function showMenu(menuType) {
  if (menuSelection) menuSelection.style.display = "none";
  fullMenus.forEach((menu) => menu.classList.remove("active"));

  const selectedMenu = document.getElementById(menuType + "Menu");
  if (selectedMenu) selectedMenu.classList.add("active");
}

function closeMenu() {
  fullMenus.forEach((menu) => menu.classList.remove("active"));
  if (menuSelection) menuSelection.style.display = "grid";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ================================
   TOGGLE MENYER (klikk på header)
   ================================ */
function toggleMeny(id) {
  const meny = document.getElementById(id);
  if (!meny) return;
  const isHidden = meny.style.display === "none" || !meny.style.display || getComputedStyle(meny).display === "none";
  meny.style.display = isHidden ? "flex" : "none";

  const header = document.querySelector(`[aria-controls="${id}"]`);
  if (header) header.setAttribute('aria-expanded', String(isHidden));
}

function initMenuHeaderClicks() {
  setTimeout(() => {
    const pizzaHeader = document.querySelector('#pizza-kategori .menu-category-header h3');
    const grillHeader = document.querySelector('#grillmat-kategori .menu-category-header h3');
    const drikkeHeader = document.querySelector('#drikke-kategori .menu-category-header h3');

    if (pizzaHeader) makeHeaderClickable(pizzaHeader, 'pizza-retter', 'Pizza meny');
    if (grillHeader) makeHeaderClickable(grillHeader, 'grillmat-retter', 'Grill meny');
    if (drikkeHeader) makeHeaderClickable(drikkeHeader, 'drikke-retter', 'Drikke meny');
  }, 500);
}

function makeHeaderClickable(headerElement, menuId, menuName) {
  headerElement.style.cssText = `
    cursor: pointer !important;
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    -webkit-touch-callout: none !important;
    transition: all 0.2s ease !important;
  `;
  headerElement.title = `Klikk for å åpne/lukke ${menuName}`;

  function handleClick(event) {
    try {
      event?.preventDefault();
      event?.stopPropagation();
      event?.stopImmediatePropagation();

      const menuElement = document.getElementById(menuId);
      if (!menuElement) return;

      const isHidden = menuElement.style.display === 'none' ||
        getComputedStyle(menuElement).display === 'none' ||
        !menuElement.style.display;

      if (isHidden) {
        menuElement.style.display = 'flex';
        setTimeout(() => {
          menuElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      } else {
        menuElement.style.display = 'none';
      }
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  }

  const newHeader = headerElement.cloneNode(true);
  headerElement.parentNode.replaceChild(newHeader, headerElement);

  newHeader.addEventListener('click', handleClick, true);
  newHeader.addEventListener('touchend', handleClick, true);

  newHeader.addEventListener('touchstart', function () {
    this.style.opacity = '0.7';
    this.style.transform = 'scale(0.98)';
  }, { passive: true });

  newHeader.addEventListener('touchend', function () {
    setTimeout(() => {
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    }, 100);
  }, { passive: true });

  newHeader.addEventListener('mouseenter', function () {
    if (!('ontouchstart' in window)) this.style.opacity = '0.8';
  });
  newHeader.addEventListener('mouseleave', function () {
    if (!('ontouchstart' in window)) this.style.opacity = '1';
  });
}

/* MODAL: BESTILL NÅ (Fjernet) */

/* WPBOOKING STICKY BANNER (Fjernet) */


/* ================================
   GOOGLE TRANSLATE
   (samlet til ÉN init-funksjon)
   ================================ */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "no",
      includedLanguages: "no,en,ar,tr,fa,uk,pl,ur,so,lt,hi",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    },
    "google_translate_element"
  );
}
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
    हिन्दी: "🇮🇳 हिन्दी"
  };

  const interval = setInterval(() => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      for (let i = 0; i < select.options.length; i++) {
        const text = select.options[i].text;
        if (flagMap[text]) select.options[i].text = flagMap[text];
      }
      clearInterval(interval);
    }
  }, 500);
}
document.addEventListener("DOMContentLoaded", addFlagsToDropdown);

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

/* ================================
   MENY-SØK (treff + flytende nav)
   ================================ */
function setupMenuSearch() {
  const input = document.getElementById('menuSearch');
  const clearBtn = document.getElementById('menuSearchClear');
  const status = document.getElementById('searchStatus');
  if (!input || !status) return;

  if (!document.getElementById('menu-search-floating-style')) {
    const st = document.createElement('style');
    st.id = 'menu-search-floating-style';
    st.textContent = `
      .menu-float-nav{position:fixed;right:18px;bottom:18px;z-index:9999;
        display:none;align-items:center;gap:8px;background:#fff;border-radius:14px;
        box-shadow:0 10px 30px rgba(0,0,0,.18);padding:8px 10px;}
      .menu-float-btn{width:40px;height:40px;border:0;border-radius:10px;background:#f7f7f8;
        cursor:pointer;font-size:18px;line-height:40px;box-shadow:0 2px 8px rgba(0,0,0,.08);}
      .menu-float-btn:active{transform:translateY(1px)}
      .menu-float-btn[disabled]{opacity:.45;cursor:not-allowed}
      .menu-float-counter{min-width:54px;text-align:center;font-weight:600}
      .current-hit{outline:2px solid #e11d48;border-radius:12px;box-shadow:0 0 0 4px rgba(225,29,72,.12)}
      @media (max-width:560px){.menu-float-nav{right:12px;bottom:12px}}
    `;
    document.head.appendChild(st);
  }

  let floatNav = document.getElementById('menuFloatNav');
  if (!floatNav) {
    floatNav = document.createElement('div');
    floatNav.id = 'menuFloatNav';
    floatNav.className = 'menu-float-nav';
    floatNav.innerHTML = `
      <button id="menuFloatPrev" class="menu-float-btn" aria-label="Forrige treff">↑</button>
      <div id="menuFloatCounter" class="menu-float-counter">0/0</div>
      <button id="menuFloatNext" class="menu-float-btn" aria-label="Neste treff">↓</button>
    `;
    document.body.appendChild(floatNav);
  }
  const prevBtn = document.getElementById('menuFloatPrev');
  const nextBtn = document.getElementById('menuFloatNext');
  const counterEl = document.getElementById('menuFloatCounter');

  const retterLists = Array.from(document.querySelectorAll('.retter-list'));
  const allDishRows = Array.from(document.querySelectorAll('.retter-list .rett-flex'));

  retterLists.forEach(l => {
    const inline = (l.getAttribute('style') || '').toLowerCase();
    l.dataset.originalDisplay = /display\s*:\s*none/.test(inline) ? 'none' : '';
  });
  allDishRows.forEach(r => {
    const inline = (r.getAttribute('style') || '').toLowerCase();
    r.dataset.originalDisplay = /display\s*:\s*none/.test(inline) ? 'none' : '';
  });

  const extraSections = Array.from(document.querySelectorAll(
    '.expandable-box, .levering-lite, #studentrabatt, .ukens-tilbud'
  ));

  const normalize = (s) => (s || '').toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
  const escapeReg = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const stripMarks = (root) => {
    root.querySelectorAll('mark').forEach(m => {
      const p = m.parentNode; p.replaceChild(document.createTextNode(m.textContent), m); p.normalize();
    });
  };
  const highlightText = (rowEl, qRaw) => {
    if (!qRaw) return;
    const re = new RegExp(escapeReg(qRaw), 'i');
    [rowEl.querySelector('.rett-top h3'), rowEl.querySelector('.rett-info p')].forEach(n => {
      if (!n) return; stripMarks(n); n.innerHTML = n.textContent.replace(re, m => `<mark>${m}</mark>`);
    });
  };
  const setAriaExpandedForList = (listEl, expanded) => {
    const id = listEl.id;
    const headerBtn =
      document.querySelector(`button[onclick*="toggleMeny('${id}')"]`) ||
      document.querySelector(`[aria-controls="${id}"]`);
    if (headerBtn) headerBtn.setAttribute('aria-expanded', String(!!expanded));
  };
  const openList = (l) => { l.style.display = 'flex'; setAriaExpandedForList(l, true); };
  const closeList = (l) => { l.style.display = 'none'; setAriaExpandedForList(l, false); };

  const index = allDishRows.map(row => {
    const t = row.querySelector('.rett-top h3')?.textContent || '';
    const d = row.querySelector('.rett-info p')?.textContent || '';
    const p = row.querySelector('.pris')?.textContent || '';
    return { row, listEl: row.closest('.retter-list'), text: normalize(`${t} ${d} ${p}`) };
  });

  let hitsList = [];
  let hitIndex = -1;
  let currentRow = null;

  const setNavUI = () => {
    const n = hitsList.length;
    counterEl.textContent = n ? `${hitIndex + 1}/${n}` : '0/0';
    prevBtn.disabled = n <= 1 || hitIndex <= 0;
    nextBtn.disabled = n <= 1 || hitIndex >= n - 1;
    floatNav.style.display = n ? 'flex' : 'none';
  };

  const focusHit = (i, { smooth = true } = {}) => {
    if (!hitsList.length) { floatNav.style.display = 'none'; return; }
    i = Math.max(0, Math.min(i, hitsList.length - 1));
    if (currentRow) currentRow.classList.remove('current-hit');
    currentRow = hitsList[i];
    currentRow.classList.add('current-hit');
    currentRow.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center' });
    hitIndex = i;
    setNavUI();
  };

  const restoreAll = () => {
    if (currentRow) currentRow.classList.remove('current-hit');
    currentRow = null; hitsList = []; hitIndex = -1;
    allDishRows.forEach(r => { stripMarks(r); r.style.display = r.dataset.originalDisplay || ''; r.classList.remove('current-hit'); });
    retterLists.forEach(l => { const o = l.dataset.originalDisplay || ''; l.style.display = o; setAriaExpandedForList(l, o !== 'none'); });
    document.querySelectorAll('.menu-category').forEach(c => { c.style.display = ''; c.classList.remove('no-results'); });
    extraSections.forEach(e => e.style.display = '');
    status.textContent = '';
    setNavUI();
  };

  const runSearch = (raw) => {
    const q = normalize(raw);
    if (!q) { restoreAll(); return; }

    index.forEach(({ row }) => { stripMarks(row); row.style.display = 'none'; row.classList.remove('current-hit'); });
    retterLists.forEach(closeList);
    document.querySelectorAll('.menu-category').forEach(c => { c.style.display = 'none'; c.classList.add('no-results'); });
    extraSections.forEach(e => e.style.display = 'none');

    hitsList = [];
    index.forEach(item => {
      if (item.text.includes(q)) {
        item.row.style.display = '';
        highlightText(item.row, raw);
        openList(item.listEl);
        const cat = item.listEl.closest('.menu-category');
        if (cat) { cat.style.display = ''; cat.classList.remove('no-results'); }
        hitsList.push(item.row);
      }
    });

    status.textContent = hitsList.length ? `${hitsList.length} treff for “${raw}”.` : `Ingen treff for “${raw}”.`;
    if (hitsList.length) focusHit(0, { smooth: false }); else setNavUI();
  };

  let timer;
  const debounce = (fn, ms = 100) => (...args) => { clearTimeout(timer); timer = setTimeout(() => fn.apply(null, args), ms); };

  input.addEventListener('input', debounce(e => runSearch(e.target.value)));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { input.value = ''; restoreAll(); input.blur(); }
    if (e.key === 'Enter') { if (hitsList.length) focusHit(Math.min(hitIndex + 1, hitsList.length - 1)); }
    if (e.altKey && e.key === 'ArrowDown') { e.preventDefault(); if (hitsList.length) focusHit(Math.min(hitIndex + 1, hitsList.length - 1)); }
    if (e.altKey && e.key === 'ArrowUp') { e.preventDefault(); if (hitsList.length) focusHit(Math.max(hitIndex - 1, 0)); }
  });
  if (clearBtn) clearBtn.addEventListener('click', () => { input.value = ''; input.focus(); restoreAll(); });

  prevBtn.addEventListener('click', () => { if (hitsList.length) focusHit(hitIndex - 1); });
  nextBtn.addEventListener('click', () => { if (hitsList.length) focusHit(hitIndex + 1); });

  restoreAll();
}

/* ================================
   MENU STICKY NAVIGATION (JUMP LINKS)
   ================================ */
function showCategory(categoryId) {
  const stickyNav = document.getElementById('menuStickyNav');
  const targetCat = document.getElementById(categoryId);

  if (!targetCat) return;

  // Sett aktiv sticky nav (highlight)
  if (stickyNav) {
    document.querySelectorAll('.menu-nav-item').forEach(item => item.classList.remove('active'));
    const activeNavItem = document.querySelector(`.menu-nav-item[data-cat="${categoryId}"]`);
    if (activeNavItem) activeNavItem.classList.add('active');
  }

  // Scroll til toppen av kategorien med riktig offset for sticky nav
  requestAnimationFrame(() => {
    const navRect = stickyNav ? stickyNav.getBoundingClientRect() : { height: 0 };
    const catTop = targetCat.getBoundingClientRect().top + window.pageYOffset;
    const scrollTarget = catTop - (navRect.height + 20);

    window.scrollTo({
      top: Math.max(0, scrollTarget),
      behavior: 'smooth'
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateOpenStatus();
  setInterval(updateOpenStatus, 1000);

  initBackToTop();
  initMenuHeaderClicks();

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

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

  setupMenuSearch();
});
