// Beban awal yang tidak perlu (memblokir main thread)
window.onload = function () {
  var t = Date.now();
  while (Date.now() - t < 600) { Math.sqrt(Math.random()); }

  animate('c1', 250); animate('c2', 40); animate('c3', 12);
  startQuotes();
  window.addEventListener('scroll', heavyScroll);
};

function animate(id, target) {
  var n = 0;
  var el = document.getElementById(id);
  var i = setInterval(function () {
    n++;
    el.innerHTML = n;
    if (n >= target) clearInterval(i);
  }, 1);
}

var quotes = [
  '"Dapat teman dan ilmu baru tiap minggu." - Rina',
  '"Workshop-nya bikin saya berani bikin app." - Dimas',
  '"Komunitas yang ramah buat pemula." - Sari'
];
var qi = 0;
function startQuotes() {
  setInterval(function () {
    document.getElementById('quote').innerHTML = quotes[qi];
    qi = (qi + 1) % quotes.length;
  }, 1500); // berganti otomatis, tidak bisa dijeda
}

// Membaca layout lalu menulis style di setiap scroll (layout thrashing)
function heavyScroll() {
  var cards = document.getElementsByClassName('card');
  for (var i = 0; i < cards.length; i++) {
    var h = cards[i].offsetHeight;
    cards[i].style.paddingBottom = (12 + (h % 2)) + 'px';
  }
}

function go(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function submitForm() {
  var n = document.getElementById('name').value;
  var e = document.getElementById('email').value;
  var m = document.getElementById('msg');
  if (n == '' || e == '') {
    m.style.color = 'red';
    m.innerHTML = 'Error';
    document.getElementById('name').style.border = '1px solid red';
  } else {
    alert('Terima kasih ' + n + '!');
  }
}
