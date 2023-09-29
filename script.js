const buttonOpenMenu = document.querySelector('.js-button-open-menu');
const mobileNav = document.querySelector('.js-nav');
const pathname = window.location.pathname;
const navLinks = document.querySelectorAll('.js-nav-link');
const form = document.querySelector('form');
const requiredInputs = document.querySelectorAll('.js-required-input');

requiredInputs.forEach(input => {
  input.addEventListener('input', (e) => {
    e.target.classList.remove('error');
    e.target.nextElementSibling.style.display = 'none';
  });
})

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = e.target[0];
  const email = e.target[1];
  const address = e.target[2];
  const message = e.target[3];
  const button = e.target[4];

  if (button.classList.contains('loading')) {
    return;
  }
  let isError = false;

  if (name.value === '') {
    name.classList.add('error');
    name.nextElementSibling.style.display = 'block';
    isError = true;
  }

  if (email.value === '') {
    email.classList.add('error');
    email.nextElementSibling.style.display = 'block';
    isError = true;
  }

  if (isError) {
    return;
  }
  
  let messageText = `Order by ${name.value}, ${email.value}.`;

  if (address.value !== '') {
    messageText += ` Address: ${address.value}.`;
  }

  if (message.value !== '') {
    messageText += ` Message: ${massage.value}`;
  }

  const botToken = '6638623940:AAFB2ScV-fOG0XFx_T3PHDnaPadPwb7ANY8';
  const chatId = '1007310681';

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: messageText,
    }),
  };

  button.classList.add('loading');

  fetch(apiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    })
    .finally(() => {
      button.classList.remove('loading');
      name.value = '';
      email.value = '';
      address.value = '';
      message.value = '';
    });

  console.dir(e.target[0]);
});

buttonOpenMenu.addEventListener('click', (e) => toggleMobileMenu(e));
document.addEventListener('scroll', (e) => toggleMobileMenu(e, true));

navLinks.forEach(navLink => {
  const comparePattern = pathname === '/' ? pathname : pathname.slice(0, -1);

  if (navLink.pathname === comparePattern) {
    navLink.classList.add('active');
  }
});

function toggleMobileMenu(e, isScroll = false) {
  const computedStyle = window.getComputedStyle(document.querySelector('.nav-button-burger'));
  if (computedStyle.getPropertyValue("display") === "none") {
    return;
  }

  if (isScroll) {
    mobileNav.classList.remove('active');
    buttonOpenMenu.classList.remove('active');

    mobileNav.style.height = '0';

    return;
  }

  mobileNav.classList.toggle('active');
  buttonOpenMenu.classList.toggle('active');

  if (mobileNav.classList.contains('active')) {
    const mainSection = document.querySelector('.main-section');

    mobileNav.style.height = mainSection.clientHeight + 2 + 'px';
  } else {
    mobileNav.style.height = '0';
  }
}

