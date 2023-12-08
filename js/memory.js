const games = {
  'Vilda djur': ["🐼", "🐵", "🐨", "🦊", "🐻", "🐯", "🦁", "🐸", "🐼", "🐵", "🐨", "🦊", "🐻", "🐯", "🦁", "🐸"],
  'Djur i havet': ["🐬", "🐙", "🦀", "🐳", "🦈", "🐡", "🦑", "🐢", "🐬", "🐙", "🦀", "🐳", "🦈", "🐡", "🦑", "🐢"],
  'Fåglar': ["🐦‍⬛", "🦜", "🦩", "🦢", "🪿", "🦚", "🦉", "🐓", "🐦‍⬛", "🦜", "🦩", "🦢", "🪿", "🦚", "🦉", "🐓"],
  'Kroppen': ["👀", "👍🏻", "👂🏻", "👱🏻‍♀️", "👃🏻", "💪🏻", "🦵🏻", "🦷", "👀", "👍🏻", "👂🏻", "👱🏻‍♀️", "👃🏻", "💪🏻", "🦵🏻", "🦷"],
  'Djur på bondgården': ["🐮", "🐷", "🐤", "🐑", "🐔", "🐎", "🐱", "🐶", "🐮", "🐷", "🐤", "🐑", "🐔", "🐎", "🐱", "🐶"],
  'Rymden': ["🚀", "🌌", "👩🏻‍🚀", "🌍", "☄️", "🪐", "🌑", "🌟", "🚀", "🌌", "👩🏻‍🚀", "🌍", "☄️", "🪐", "🌑", "🌟"]
};

const cardBacks = {
  'Vilda djur': 'img/pattern-for-wild.png',
  'Djur i havet': 'img/pattern-for-sea.png',
  'Fåglar': 'img/pattern-for-birds.png',
  'Kroppen': 'img/pattern-for-body.png',
  'Djur på bondgården': 'img/pattern-for-farm.png',
  'Rymden': 'img/pattern-for-space.png',
};

let currentGame = 'Vilda djur';
let emojis = games[currentGame];
let cardBack = cardBacks[currentGame];
    
const gridContainer = document.querySelector('.memory-grid-container');
  let cards = [];
  let firstCard, secondCard;
  let lockBoard = false;
  let score = 0;

  document.querySelector('.score').textContent = score;

  shuffleCards();
  generateCards();

function shuffleCards() {
  let currentIndex = emojis.length,
    randomIndex,
    temporaryValue;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = emojis[currentIndex];
        emojis[currentIndex] = emojis[randomIndex];
        emojis[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of emojis) {
    const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.setAttribute('data-name', card);
      cardElement.style.backgroundImage = `url('${cardBack}')`;
      cardElement.innerHTML = `
        <div class="front">
          ${card}
        </div> 
        <div class="back"></div>
      `;
      gridContainer.appendChild(cardElement);
      cardElement.addEventListener('click', flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
    this.classList.add('flipped');
      if (!firstCard) {
        firstCard = this;
        return;
    }
      secondCard = this;
      score++;
      document.querySelector('.score').textContent = score;
      lockBoard = true;

      checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector('.score').textContent = score;
  gridContainer.innerHTML = '';
  cardBack = cardBacks[currentGame];
  generateCards();
}

function changeGame(game) {
  currentGame = game;
  emojis = games[currentGame];
  cardBack = cardBacks[currentGame];
  restart();
}