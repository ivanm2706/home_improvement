const button = document.querySelector('.js-button-open-menu');
const mobileNav = document.querySelector('.js-nav');
const pathname = window.location.pathname;

const navLinks = document.querySelectorAll('.js-nav-link');

navLinks.forEach(navLink => {
  const comparePattern = pathname === '/' ? pathname : pathname.slice(0, -1);

  if (navLink.pathname === comparePattern) {
    navLink.classList.add('active');
  }
});


button.addEventListener('click', (e) => {
  mobileNav.classList.toggle('active');
  console.dir(mobileNav.classList);
});