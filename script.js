document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');
  const targetImg = document.getElementById('target-img');
  const targetName = document.getElementById('target-name');

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

  const letters = Object.keys(imageMapping); // A..Z
  const targetOrder = [...letters];          // target sequence
  let currentTargetIndex = 0;

  function updateTargetUI() {
    const value = targetOrder[currentTargetIndex];
    const file = imageMapping[value];

    targetImg.src = `assets/${file}`;
    targetName.textContent = `${value} — ${file.replace('.png', '').replace(/-/g, ' ')}`;
  }

  // ✅ ONE card per letter, shuffled
  const cardValues = [...letters].sort(() => Math.random() - 0.5);

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
    if (card.classList.contains('matched')) return; // already correct

    const img = card.querySelector('img');
    img.style.display = 'block';

    const value = card.dataset.value;
    const target = targetOrder[currentTargetIndex];

    isLocked = true;

    if (value === target) {
      // ✅ correct target -> keep it open permanently
      setTimeout(() => {
        card.classList.add('matched');
        img.style.display = 'block';

        currentTargetIndex++;

        if (currentTargetIndex < targetOrder.length) {
          updateTargetUI();
          isLocked = false;
        } else {
          // ✅ finished all targets -> show full reveal + overlay then go
          showCompleteAndGo();
        }
      }, 200);
    } else {
      // ❌ wrong -> flip back
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
    revealAllCards();

    const overlay = document.getElementById('complete-overlay');
    if (overlay) overlay.style.display = 'flex';

    setTimeout(() => {
      localStorage.setItem('completedCount', targetOrder.length);
      window.location.href = 'completion.html';
    }, 1500);
  }
});
