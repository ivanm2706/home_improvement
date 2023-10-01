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
  const phone = e.target[1];
  const email = e.target[2];

  const address = e.target[3];
  const message = e.target[4];
  const buttonSubmit = document.querySelector('button[type="submit"]');

  if (buttonSubmit.classList.contains('loading')) {
    return;
  }

  let isError = false;

  if (name.value === '') {
    name.classList.add('error');
    name.nextElementSibling.style.display = 'block';
    isError = true;
  }

  if (phone.value === '') {
    phone.classList.add('error');
    phone.nextElementSibling.style.display = 'block';
    isError = true;
  }

  if (isError) {
    return;
  }
  
  let messageText = `Order by ${name.value}, phone: ${phone.value}.`;

  if (email && email.value) {
    messageText += ` Email: ${email.value}`;
  }

  if (address && address.value !== '') {
    messageText += ` Address: ${address.value}.`;
  }

  if (message && message.value !== '') {
    messageText += ` Message: ${message.value}`;
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

  buttonSubmit.classList.add('loading');

  fetch(apiUrl, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    })
    .finally(() => {
      buttonSubmit.classList.remove('loading');
      name.value = '';
      email.value = '';
      phone.value = '';

      if (address) {
        address.value = '';
      }

      if (message) {
        message.value = '';
      }
    });

  console.dir(e.target[0]);
});

buttonOpenMenu.addEventListener('click', (e) => toggleMobileMenu(e));
document.addEventListener('scroll', (e) => toggleMobileMenu(e, true));

navLinks.forEach(navLink => {
  const link = pathname.split('/');
  let comparePattern = link[link.length - 1];

  if (comparePattern === '') {
    comparePattern = '/';
  }

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
    console.log(mainSection);

    if(mainSection) {
      mobileNav.style.height = mainSection.clientHeight + 2 + 'px';
    } else {
      mobileNav.style.height = '270px';
    }
  } else {
    mobileNav.style.height = '0';
  }
}

