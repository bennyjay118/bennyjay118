// South Florida Electric — small enhancements
(function () {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Booking form: set min date to today, basic validation, fake submit
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  function validateField(field) {
    const wrap = field.closest('.form-field');
    if (!wrap) return field.checkValidity();
    const valid = field.checkValidity();
    wrap.classList.toggle('has-error', !valid);
    return valid;
  }

  function wireForm(formId, onSuccess) {
    const form = document.getElementById(formId);
    if (!form) return;
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(f => f.addEventListener('blur', () => validateField(f)));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let allOk = true;
      fields.forEach(f => { if (!validateField(f)) allOk = false; });
      if (!allOk) {
        const firstErr = form.querySelector('.has-error input, .has-error select, .has-error textarea');
        if (firstErr) firstErr.focus();
        return;
      }
      onSuccess(form);
    });
  }

  wireForm('bookingForm', (form) => {
    const data = new FormData(form);
    const success = document.getElementById('formSuccess');
    document.getElementById('successName').textContent = data.get('firstName') || '';
    document.getElementById('successPhone').textContent = data.get('phone') || '';
    const date = data.get('date');
    const time = data.get('time');
    document.getElementById('successWindow').textContent = `${date} ${time}`;
    form.querySelector('button[type="submit"]').disabled = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  wireForm('contactForm', (form) => {
    const success = document.getElementById('contactSuccess');
    form.querySelector('button[type="submit"]').disabled = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
