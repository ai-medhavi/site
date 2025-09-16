// Extracted from index.html <script>

// Favicon and logo theme switcher
function setFaviconAndLogoForTheme(theme) {
  const favicon = document.getElementById('favicon');
  const logo = document.getElementById('navbar-logo');
  const heroLogo = document.getElementById('hero-logo');
  if (favicon) {
    favicon.href = theme === 'dark' ? 'assets/favicon/favicon-black-circle.ico' : 'assets/favicon/favicon-white-circle.ico';
  }
  if (logo) {
    logo.src = theme === 'dark' ? 'assets/logo/logo-black-circle.png' : 'assets/logo/logo-white-circle.png';
  }
  if (heroLogo) {
    heroLogo.src = theme === 'dark' ? 'assets/hero/medhavi-hero-480-black-1.png' : 'assets/hero/medhavi-hero-480-white-1.png';
    heroLogo.srcset = theme === 'dark'
      ? 'assets/hero/medhavi-hero-480-black-1.png 1x, assets/hero/medhavi-hero-960-black-1.png 2x'
      : 'assets/hero/medhavi-hero-480-white-1.png 1x, assets/hero/medhavi-hero-960-white-1.png 2x';
  }
}

// Initial favicon and logo set based on theme
(function() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = 'light';
  if (savedTheme) {
    theme = savedTheme;
  } else if (systemPrefersDark) {
    theme = 'dark';
  }
  setFaviconAndLogoForTheme(theme);
})();
// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const menu = document.getElementById('primary-menu');
navToggle && navToggle.addEventListener('click', ()=>{
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  if(mobileMenu) mobileMenu.classList.toggle('open');
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
      // close mobile menu
      if(window.innerWidth < 900 && mobileMenu) mobileMenu.classList.remove('open');
    }
  })
})

// About Us expand/collapse
const moreInfoBtn = document.getElementById('more-info');
const lessInfoBtn = () => document.getElementById('less-info');
if(moreInfoBtn) {
  moreInfoBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('about-short').style.display = 'none';
    document.getElementById('about-full').style.display = 'block';
    // scroll into view for better ux on small screens
    document.getElementById('about-full').scrollIntoView({behavior:'smooth',block:'start'});
  });
}
// Less info button handler (delegated in case of re-render)
document.addEventListener('click', function(e) {
  if(e.target && e.target.id === 'less-info') {
    e.preventDefault();
    document.getElementById('about-full').style.display = 'none';
    document.getElementById('about-short').style.display = 'block';
    document.getElementById('about-short').scrollIntoView({behavior:'smooth',block:'start'});
  }
});

// Improve focus outlines for accessibility
document.addEventListener('keyup', (e) => {
  if(e.key === 'Tab') document.documentElement.classList.add('user-is-tabbing');
});

// Theme switcher
const htmlEl = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  htmlEl.setAttribute('data-theme', savedTheme);
} else if (systemPrefersDark) {
  htmlEl.setAttribute('data-theme', 'dark');
}

function handleThemeToggle() {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  setFaviconAndLogoForTheme(newTheme);
}

const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
if (themeToggle) themeToggle.addEventListener('click', handleThemeToggle);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', handleThemeToggle);
