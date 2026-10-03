document.addEventListener('DOMContentLoaded', () => {
  // 1. AOS kutubxonasini ishga tushirish (Scroll animatsiyalari)
  AOS.init({
    duration: 1000,
    once: true,
    offset: 80
  });

  const openBtn = document.getElementById('openBtn');
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  // 2. Taklifnomani ochish va Musiqani qat'iy ijro etish
  openBtn.addEventListener('click', () => {
    envelopeOverlay.classList.add('hidden');

    // Foydalanuvchi tugmani bosgach musiqani ishga tushiramiz
    bgMusic.volume = 0.6; // Yoqimli eshitilishi uchun balandligi 60% ga sozlandi
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
    }).catch(err => {
      console.warn("Musiqa ijrosi bloklandi: Foydalanuvchi keyinroq tugma orqali yoqishi mumkin.", err);
    });

    // Hashamatli konfetti salyuti
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#aa820a', '#ffffff', '#ffd1dc']
    });

    // Gul barglari tushishini boshlash
    startFallingPetals();
  });

  // 3. Musiqa Play/Pause tugmasi boshqaruvi
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.classList.add('playing');
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
    }
  });

  // 4. Ortga hisoblash taymeri: 2026-yil 24-oktyabr, 09:00
  const weddingDate = new Date('2026-10-24T09:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      const countdownContainer = document.getElementById('countdown');
      if (countdownContainer) {
        countdownContainer.innerHTML = "<p style='color: var(--gold-primary); font-weight: 600;'>To'y tantanalari boshlandi!</p>";
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 5. Fonda nozik gul barglari yog'ilishi generatori
  function startFallingPetals() {
    const container = document.getElementById('petalContainer');
    setInterval(() => {
      const petal = document.createElement('div');
      petal.classList.add('petal');
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = Math.random() * 3 + 4 + 's';
      petal.style.width = Math.random() * 10 + 10 + 'px';
      petal.style.height = petal.style.width;
      
      container.appendChild(petal);
      setTimeout(() => {
        petal.remove();
      }, 7000);
    }, 450);
  }
});