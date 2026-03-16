const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const siteHeader = document.querySelector('.site-header');
const tabLinks = Array.from(document.querySelectorAll('.tab-link[data-tab-target]'));
const tabPanels = Array.from(document.querySelectorAll('.tab-panel[data-tab-panel]'));
const sectionNavLinks = Array.from(document.querySelectorAll('.section-nav a[href^="#"]'));
const bannerSection = document.getElementById('banner');
const bannerImage = document.querySelector('.banner-figure img');
const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
const rootStyle = document.documentElement.style;
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const panelByName = new Map(tabPanels.map((panel) => [panel.dataset.tabPanel, panel]));
const sectionToTab = new Map();
let rafScrollSync = null;

function closePrimaryNav() {
  if (primaryNav) {
    primaryNav.classList.remove('open');
  }

  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
  }
}

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

tabPanels.forEach((panel) => {
  const tabName = panel.dataset.tabPanel;
  panel.querySelectorAll('[id]').forEach((element) => {
    sectionToTab.set(element.id, tabName);
  });
});

function getStickyOffset() {
  const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
  return headerHeight + 20;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function scrollToSection(section, behavior = 'smooth') {
  if (!section) {
    return;
  }

  const top = window.scrollY + section.getBoundingClientRect().top - getStickyOffset();
  const finalTop = Math.max(0, top);
  const finalBehavior = reducedMotionQuery.matches ? 'auto' : behavior;

  window.scrollTo({
    top: finalTop,
    behavior: finalBehavior
  });
}

function activateTab(tabName) {
  if (!panelByName.has(tabName)) {
    return;
  }

  tabPanels.forEach((panel) => {
    const isActive = panel.dataset.tabPanel === tabName;
    panel.classList.toggle('is-active', isActive);
    panel.hidden = !isActive;
  });

  tabLinks.forEach((link) => {
    const isActive = link.dataset.tabTarget === tabName;
    link.classList.toggle('is-active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  sectionNavLinks.forEach((link) => {
    link.classList.remove('is-active');
  });

  requestAnimationFrame(() => {
    syncScrollEffects();
  });
}

function sectionFromHash(hash) {
  if (!hash || !hash.startsWith('#')) {
    return null;
  }

  const id = hash.slice(1);
  if (!id) {
    return null;
  }

  return document.getElementById(id);
}

function showTabForHash(hash, shouldScroll = false) {
  const section = sectionFromHash(hash);

  if (!section) {
    activateTab('home');
    return;
  }

  const tabName = sectionToTab.get(section.id);
  activateTab(tabName || 'home');

  if (shouldScroll) {
    requestAnimationFrame(() => {
      scrollToSection(section, 'smooth');
    });
  }
}

function setActiveSectionLink(sectionId) {
  sectionNavLinks.forEach((link) => {
    const isMatch = link.getAttribute('href') === `#${sectionId}`;
    link.classList.toggle('is-active', isMatch);
  });
}

function getActivationLine() {
  const stickyOffset = getStickyOffset();
  return Math.max(stickyOffset + 16, window.innerHeight * 0.34);
}

function updateActiveSection() {
  const activePanel = document.querySelector('.tab-panel.is-active');

  if (!activePanel) {
    return;
  }

  const navTargets = Array.from(activePanel.querySelectorAll('.section-nav a[href^="#"]'))
    .map((link) => sectionFromHash(link.getAttribute('href') || ''))
    .filter((target) => target && activePanel.contains(target));

  if (navTargets.length === 0) {
    return;
  }

  const activationLine = getActivationLine();
  let currentSection = navTargets[0];

  for (const section of navTargets) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= activationLine) {
      currentSection = section;
    } else {
      break;
    }
  }

  setActiveSectionLink(currentSection.id);
}

function updatePanelProgress() {
  const activePanel = document.querySelector('.tab-panel.is-active');

  if (!activePanel) {
    rootStyle.setProperty('--panel-progress', '0');
    return;
  }

  const panelRect = activePanel.getBoundingClientRect();
  const panelTop = window.scrollY + panelRect.top;
  const scrollableDistance = Math.max(activePanel.scrollHeight - window.innerHeight + getStickyOffset(), 1);
  const progress = clamp((window.scrollY - panelTop + getStickyOffset()) / scrollableDistance, 0, 1);

  rootStyle.setProperty('--panel-progress', progress.toFixed(3));
}

function updateHeroParallax() {
  if (!bannerSection || !bannerImage) {
    return;
  }

  if (reducedMotionQuery.matches) {
    bannerImage.style.setProperty('--hero-shift', '0px');
    return;
  }

  const homePanel = bannerSection.closest('.tab-panel');
  if (!homePanel || !homePanel.classList.contains('is-active')) {
    bannerImage.style.setProperty('--hero-shift', '0px');
    return;
  }

  const rect = bannerSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  if (rect.bottom <= 0 || rect.top >= viewportHeight) {
    return;
  }

  const normalized = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
  const shift = (normalized - 0.5) * 30;

  bannerImage.style.setProperty('--hero-shift', `${shift.toFixed(2)}px`);
}

function syncScrollEffects() {
  updateActiveSection();
  updatePanelProgress();
  updateHeroParallax();
}

function scheduleScrollEffects() {
  if (rafScrollSync !== null) {
    return;
  }

  rafScrollSync = requestAnimationFrame(() => {
    rafScrollSync = null;
    syncScrollEffects();
  });
}

function enhanceGalleryAssets() {
  galleryCards.forEach((card, index) => {
    const image = card.querySelector('img');
    const figcaption = card.querySelector('figcaption');

    if (!image || !figcaption) {
      return;
    }

    const src = image.getAttribute('src');
    if (!src) {
      return;
    }

    const assetLabel = figcaption.querySelector('.asset-label')?.textContent?.trim() || `component-${index + 1}`;

    if (!image.parentElement || !image.parentElement.classList.contains('gallery-image-link')) {
      const imageLink = document.createElement('a');
      imageLink.className = 'gallery-image-link';
      imageLink.href = src;
      imageLink.target = '_blank';
      imageLink.rel = 'noopener noreferrer';
      imageLink.setAttribute('aria-label', `View ${assetLabel} in a new tab`);

      image.parentNode.insertBefore(imageLink, image);
      imageLink.appendChild(image);
    }

    if (!figcaption.querySelector('.gallery-open-link')) {
      const actionLink = document.createElement('a');
      actionLink.className = 'gallery-open-link';
      actionLink.href = src;
      actionLink.target = '_blank';
      actionLink.rel = 'noopener noreferrer';
      actionLink.textContent = 'View Image';
      figcaption.appendChild(actionLink);
    }
  });
}

function handleNavLinkClick(link, event) {
  const hash = link.getAttribute('href') || '';
  const targetTab = link.dataset.tabTarget;
  const section = sectionFromHash(hash);

  if (!hash.startsWith('#')) {
    return;
  }

  event.preventDefault();

  if (targetTab) {
    activateTab(targetTab);
  }

  if (section) {
    if (window.location.hash !== hash) {
      history.pushState(null, '', hash);
    }

    requestAnimationFrame(() => {
      scrollToSection(section, 'smooth');
      updateActiveSection();
    });
  }

  closePrimaryNav();
}

tabLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    handleNavLinkClick(link, event);
  });
});

sectionNavLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    handleNavLinkClick(link, event);
  });
});

window.addEventListener('hashchange', () => {
  showTabForHash(window.location.hash, true);
  syncScrollEffects();
});

window.addEventListener(
  'scroll',
  () => {
    scheduleScrollEffects();
  },
  { passive: true }
);

window.addEventListener('resize', () => {
  scheduleScrollEffects();
});

if (typeof reducedMotionQuery.addEventListener === 'function') {
  reducedMotionQuery.addEventListener('change', scheduleScrollEffects);
} else if (typeof reducedMotionQuery.addListener === 'function') {
  reducedMotionQuery.addListener(scheduleScrollEffects);
}

const reveals = Array.from(document.querySelectorAll('.reveal'));
if ('IntersectionObserver' in window && reveals.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio <= 0) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      // Large sections (like the full component gallery) may never hit high ratios.
      threshold: 0.01,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  reveals.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  reveals.forEach((element) => element.classList.add('is-visible'));
}

enhanceGalleryAssets();
showTabForHash(window.location.hash, false);
syncScrollEffects();
