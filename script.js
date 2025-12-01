const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");

const emojis = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🥝', '🍒'];
let cardValues = [...emojis, ...emojis]; 
let flippedCards = [];
let matchedCards = [];
let moves = 0;

// Shuffle the array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create card elements
function createBoard() {
  shuffle(cardValues);
  board.innerHTML = '';
  cardValues.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = emoji;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${emoji}</div>
      </div>
    `;

    card.addEventListener('click', () => handleCardClick(card));
    board.appendChild(card);
  });
}

// Handle click
function handleCardClick(card) {
  if (
    card.classList.contains('flip') ||
    flippedCards.length === 2 ||
    matchedCards.includes(card)
  ) return;

  card.classList.add('flip');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
    checkForMatch();
  }
}

// Check match
function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === cardValues.length) {
      setTimeout(() => alert(`🎉 You won in ${moves} moves!`), 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      flippedCards = [];
    }, 1000);
  }
}

createBoard();
