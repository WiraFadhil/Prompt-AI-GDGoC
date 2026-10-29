(function () {
  'use strict';

  // Menu mobile
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  var mq = window.matchMedia('(max-width: 640px)');
  function syncNav() { nav.hidden = mq.matches && toggle.getAttribute('aria-expanded') !== 'true'; }
  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    syncNav();
  });
  mq.addEventListener('change', syncNav);
  syncNav();

  // Validasi form dengan pesan yang bisa dibaca screen reader
  var form = document.getElementById('join-form');
  var status = document.getElementById('status');

  function setError(input, message) {
    var err = document.getElementById(input.id + '-err');
    if (message) {
      err.textContent = message; err.hidden = false;
      input.setAttribute('aria-invalid', 'true');
    } else {
      err.hidden = true; input.removeAttribute('aria-invalid');
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    var name = form.elements.name, email = form.elements.email;
    var firstInvalid = null;

    if (!name.value.trim()) { setError(name, 'Nama wajib diisi.'); firstInvalid = firstInvalid || name; }
    else setError(name, '');

    if (!/^\S+@\S+\.\S+$/.test(email.value)) { setError(email, 'Masukkan email yang valid, contoh: nama@kampus.ac.id.'); firstInvalid = firstInvalid || email; }
    else setError(email, '');

    if (firstInvalid) { firstInvalid.focus(); return; }
    status.textContent = 'Terima kasih, ' + name.value.trim() + '! Pendaftaranmu sudah kami terima.';
    form.reset();
  });
})();
