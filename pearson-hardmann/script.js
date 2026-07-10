const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

const practiceTriggers = document.querySelectorAll('.practice-trigger');

practiceTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    const parent = trigger.closest('.practice-item');

    practiceTriggers.forEach(t => {
      t.setAttribute('aria-expanded', 'false');
      t.closest('.practice-item').classList.remove('open');
    });

    if (!expanded) {
      trigger.setAttribute('aria-expanded', 'true');
      parent.classList.add('open');
    }
  });
});

const form = document.querySelector('.contact-form');
const feedback = form?.querySelector('.form-feedback');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  feedback.textContent = 'Thank you. We will review your inquiry and respond within one business day.';
  form.querySelectorAll('input, textarea').forEach(el => el.value = '');
  setTimeout(() => { feedback.textContent = ''; }, 6000);
});

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.style.boxShadow = '0 1px 3px rgba(30, 30, 36, 0.04)';
  } else {
    header.style.boxShadow = 'none';
  }
});
