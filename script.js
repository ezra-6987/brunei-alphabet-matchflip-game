document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');
  const scoreDisplay = document.getElementById('score');

  let score = 0;
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

  const letters = Object.keys(imageMapping);     // A..Z
  const targetOrder = [...letters];              // order of targets
  let currentTargetIndex = 0;

  function updateTargetUI() {
    const value = targetOrder[currentTargetIndex];
    const file = imageMapping[value];

    document.getElementById('target-img').src = `assets/${file}`;
    document.getElementById('target-name').textContent =
      `${value} — ${file.replace('.png', '').replace(/-/g, ' ')}`;
  }

  // ✅ ONE card per letter (no pairs)
  const cardValues = [...letters];
  cardValues.sort(() => 0.5 - Math.random());

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
    if (card.classList.contains('hidden')) return;

    // Reveal
    const img = card.querySelector('img');
    img.style.display = 'block';

    const value = card.dataset.value;
    const target = targetOrder[currentTargetIndex];

    isLocked = true;

    // ✅ If matches target: keep/remove + next target
    if (value === target) {
      setTimeout(() => {
        card.classList.add('hidden');
        score++;
        scoreDisplay.textContent = score;

        currentTargetIndex++;
        if (currentTargetIndex < targetOrder.length) {
          updateTargetUI();
        } else {
          // Finished all targets
          localStorage.setItem('score', score);
          window.location.href = 'completion.html';
        }

        isLocked = false;
      }, 250);
    } else {
      // ❌ Not target: flip back
      setTimeout(() => {
        img.style.display = 'none';
        isLocked = false;
      }, 500);
    }
  }
});
