document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const scoreDisplay = document.getElementById('score');
    const messageDisplay = document.getElementById('message');
    let cards = [];
    let flippedCards = [];
    let score = 0;


    //Mapping card values to image names
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


    function updateTargetUI() {
        const value = targetOrder[currentTargetIndex];
        document.getElementById('target-img').src = `assets/${imageMapping[value]}`;
        document.getElementById('target-name').textContent =
            `${value} — ${imageMapping[value]
            .replace('.png','')
            .replace(/-/g,' ')}`;
    }

    // Generate card values (pairs)
    const cardValues = [];
    const letters = Object.keys(imageMapping); // ['A','B','C',...]
    letters.forEach(letter => {
    cardValues.push(letter, letter);
    });
    cardValues.sort(() => 0.5 - Math.random());

    const targetOrder = [...letters]; // match order
    let currentTargetIndex = 0;

    // Create card elements
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const img = document.createElement('img');
        img.src = `assets/${imageMapping[value]}`;
        img.style.display = 'none';
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        grid.appendChild(card);
        cards.push(card);
    });

    updateTargetUI();

    // Function to check if all cards are matched
    function allCardsMatched() {
        return cards.every(card => card.classList.contains('hidden'));
    }

    // Flip card function
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('hidden') && !flippedCards.includes(this)) {
            this.querySelector('img').style.display = 'block';
            flippedCards.push(this);
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    // Check for match
    function checkMatch() {
  const [card1, card2] = flippedCards;

  const samePair = card1.dataset.value === card2.dataset.value;

  if (!samePair) {
    // Not a pair -> flip back
    card1.querySelector('img').style.display = 'none';
    card2.querySelector('img').style.display = 'none';
    flippedCards = [];
    return;
  }

  // It IS a pair
  const matchedValue = card1.dataset.value;
  const isTarget = matchedValue === targetOrder[currentTargetIndex];

  if (isTarget) {
    // ✅ Correct target -> keep them hidden + score + next target
    card1.classList.add('hidden');
    card2.classList.add('hidden');

    score++;
    scoreDisplay.textContent = score;

    currentTargetIndex++;
    if (currentTargetIndex < targetOrder.length) {
      updateTargetUI();
    }

    if (allCardsMatched()) {
      checkScore();
    }
  } else {
    // ❌ Pair matched but NOT the target -> flip back
    setTimeout(() => {
      card1.querySelector('img').style.display = 'none';
      card2.querySelector('img').style.display = 'none';
    }, 300);
  }

  flippedCards = [];
}



    //Check score and determine the option
    function checkScore() {
        localStorage.setItem('score', score);
        window.location.href = 'completion.html'
    }

});

