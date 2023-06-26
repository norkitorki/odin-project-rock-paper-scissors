const gameControls = document.querySelector('.game-controls');
const roundsSelect = document.getElementById('game-rounds');
const startButton  = document.querySelector('.start-game');
const gameChoices  = document.querySelector('.game-choices');
const buttons      = gameChoices.querySelectorAll('button');
const output       = document.querySelector('.output');
const gameOutput   = document.querySelector('.game-output');
const roundOutput  = document.querySelector('.round-output');

let roundsCount = 5, gameActive = false, currentRound, score;

roundsSelect.addEventListener('change', (e) => roundsCount = Number(e.target.value));

startButton.addEventListener('click', () => roundsCount > 0 ? initializeGame() : alert('Minimum number of rounds is 1'));

buttons.forEach(btn => btn.addEventListener('click', () => playRound(btn.dataset['choice'], getComputerChoice(), roundsCount)));

function initializeGame() {
  gameActive   = true;
  currentRound = 1;
  score        = { player: 0, computer: 0 };

  updateDisplayedScore(score);
  
  [gameOutput, roundOutput].forEach(el => el.textContent = '');
  [gameControls, output].forEach(el => el.classList.add('hidden'));
  gameChoices.classList.remove('hidden');

  return null;
};

function playRound(playerChoice, computerChoice, maxRounds) {
  if (gameActive) {
    gameOutput.textContent = `Round: ${currentRound} of ${maxRounds}`;

    const roundResult = roundResults(playerChoice, computerChoice);

    displayChoice('player', playerChoice);
    displayChoice('computer', computerChoice);

    roundOutput.textContent = logRoundResult(roundResult, playerChoice, computerChoice);
    styleRoundOutput(roundOutput, roundResult);

    output.classList.remove('hidden');

    if (roundResult === 0) return null;
    if (roundResult === 1)  score['player'] += 1;
    if (roundResult === -1) score['computer'] += 1;

    updateDisplayedScore(score);

    if (currentRound < maxRounds) {
      currentRound += 1;
    } else {
      gameOutput.textContent = logFinalResult(score);
      gameControls.classList.remove('hidden');
      gameChoices.classList.add('hidden');
      gameActive = false;
    }
  }

  return null;
};

function getComputerChoice() {
  const index = Math.floor(Math.random() * 3);
  return ['Rock', 'Paper', 'Scissors'][index];
};

function updateDisplayedScore(score) {
  ['player', 'computer'].forEach(player => document.querySelector(`.${player}-score`).textContent = `(${score[player]})`);
};

function roundResults(playerChoice, computerChoice) {
  const winningOutcomes = ['RockScissors', 'PaperRock', 'ScissorsPaper'];

  if (winningOutcomes.includes(`${playerChoice}${computerChoice}`)) {
    return 1;
  } else if (playerChoice === computerChoice) {
    return 0;
  } else {
    return -1;
  }
};

function displayChoice(player, choice) {
  const wrapper = document.querySelector(`.${player}-choice`);
  const image   = wrapper.querySelector('img');

  image.src = `images/${choice}.svg`;
  image.alt = choice;

  wrapper.classList.remove('hidden');
};

function logRoundResult(result, playerChoice, computerChoice) {
  if (result === 1) {
    return `You win! ${playerChoice} beats ${computerChoice}`;
  } else if (result === 0) {
    return `It's a draw! both players chose ${playerChoice}`;
  } else {
    return `You loose! ${computerChoice} beats ${playerChoice}`;
  }
};

function styleRoundOutput(output, roundResult) {
  output.classList.remove('round-win', 'round-loss');
  
  if (roundResult === 1) output.classList.add('round-win');
  if (roundResult === -1) output.classList.add('round-loss');
};

function logFinalResult(score) {
  const finalScore = `${score['player']} to ${score['computer']}`;

  if (score['player'] > score['computer']) {
    return `Congratulations! You have won the game with a score of ${finalScore}`;
  } else if (score['player'] === score['computer']) {
    return `The game ended in a draw at ${finalScore}`;
  } else {
    return `You have lost the game with a score of ${finalScore}`;
  }
};
