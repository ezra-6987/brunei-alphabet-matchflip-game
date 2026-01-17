document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');
  const targetImg = document.getElementById('target-img');
  const targetName = document.getElementById('target-name');

  if (!grid) return; // grid must exist

  let isLocked = false;

  const imageMapping = {
    A: 'ambuyat.png',
    B: 'balingkawat.png',
    C: 'candas.png',
    D: 'dalamu.png',
    E: 'emping.png',
    F: 'foto.png',
    G: 'giuk.png',
    H: 'hama.png',
    I: 'indung.png',
    J: 'jagau.png',
    K: 'kutin.png',
    L: 'lalam.png',
    M: 'menunu.png',
    N: 'nandung.png',
    O: 'oren.png',
    P: 'patu.png',
    Q: 'qariah.png',
    R: 'rangit.png',
    S: 'sikoi.png',
    T: 'tibadak.png',
    U: 'usin.png',
    V: 'virus.png',
    W: 'wasit.png',
    X: 'xilofon.png',
    Y: 'ya.png',
    Z: 'zirafah.png'
  };

  const letters = Object.keys(imageMapping);
  const targetOrder = [...letters];
  let currentTargetIndex = 0;

  function updateTargetUI() {
    const value = targetOrder[currentTargetIndex];
    const file = imageMapping[value];
    if (!value || !file) return;

    if (targetImg) targetImg.src = `assets/${file}`;
    if (targetName) {
      targetName.textContent = `${value} — ${file.replace('.png', '').replace(/-/g, ' ')}`;
    }
  }

  // Fisher-Yates shuffle
  const cardValues = [...letters];
  for (let i = cardValues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
  }

  // Create cards
  cardValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    const img = document.createElement('img');
    img.src = `assets/${imageMapping[value]}`;
    img.style.display = 'none';

    card.appendChild(img);
    card.addEventListener('click', () => handleCardClick(card));
    grid.appendChild(card);
  });

  updateTargetUI();

  function handleCardClick(card) {
    if (isLocked) return;
    if (card.classList.contains('matched')) return;

    const img = card.querySelector('img');
    img.style.display = 'block';

    const value = card.dataset.value;
    const target = targetOrder[currentTargetIndex];

    isLocked = true;

    if (value === target) {
      setTimeout(() => {
        card.classList.add('matched');
        img.style.display = 'block';

        currentTargetIndex++;

        if (currentTargetIndex < targetOrder.length) {
          updateTargetUI();
          isLocked = false;
        } else {
          showCompleteAndGo();
        }
      }, 200);
    } else {
      setTimeout(() => {
        img.style.display = 'none';
        isLocked = false;
      }, 500);
    }
  }

  function revealAllCards() {
    document.querySelectorAll('.card').forEach(card => {
      const img = card.querySelector('img');
      if (img) img.style.display = 'block';
      card.classList.add('matched');
    });
  }

  function showCompleteAndGo() {
    isLocked = true; // lock inputs immediately
    revealAllCards();

    const overlay = document.getElementById('complete-overlay');
    if (overlay) overlay.style.display = 'flex';

    setTimeout(() => {
      localStorage.setItem('completedCount', targetOrder.length);
      window.location.href = 'completion.html';
    }, 1500);
  }
});
