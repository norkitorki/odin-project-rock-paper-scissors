const gameControls = document.querySelector('.game-controls');
const roundsSelect = document.getElementById('game-rounds');
const startButton  = document.querySelector('.start-game');
const gameChoices  = document.querySelector('.game-choices');
const images       = gameChoices.querySelectorAll('img');
const output       = document.querySelector('.output');
const gameOutput   = document.querySelector('.game-output');
const roundOutput  = document.querySelector('.round-output');

const CHOICES = [ 'Rock', 'Paper', 'Scissors' ];

let roundsCount = 5, gameActive = false, currentRound, score;

roundsSelect.addEventListener('change', (e) => roundsCount = Number(e.target.value));
startButton.addEventListener('click', () => roundsCount > 0 ? initializeGame() : alert('Minimum number of rounds is 1'));
images.forEach(img => img.addEventListener('click', () => playRound(img.alt, getComputerChoice(), roundsCount)));

function initializeGame() {
  gameActive   = true;
  currentRound = 1;
  score        = { player: 0, computer: 0 };

  [gameOutput, roundOutput].forEach(el => el.textContent = '');
  [gameControls, output].forEach(el => el.classList.add('hidden'));
  gameChoices.classList.remove('hidden');

  return null;
};

function playRound(playerChoice, computerChoice, maxRounds) {
  if (gameActive) {
    const roundResult = roundResults(playerChoice, computerChoice);

    displayChoice('player', playerChoice);
    displayChoice('computer', computerChoice);

    roundOutput.textContent = logRoundResult(roundResult, playerChoice, computerChoice);
    styleRoundOutput(roundOutput, roundResult);

    output.classList.remove('hidden');

    if (roundResult === 1)  score['player'] += 1;
    if (roundResult === -1) score['computer'] += 1;
    updateDisplayedScore(score);

    if (currentRound < maxRounds) {
      gameOutput.textContent = `Round: ${currentRound} of ${maxRounds}`;
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

function playRound(playerChoice, computerChoice) {
  const winningOutcomes = ['RockScissors', 'PaperRock', 'ScissorsPaper'];

  if (winningOutcomes.includes(`${playerChoice}${computerChoice}`)) {
    return 1;
  } else if (playerChoice === computerChoice) {
    return 0;
  } else {
    return -1;
  }
};

function logRoundResult(result, playerChoice, computerChoice) {
  if (result === 1) {
    console.log(`You win! ${playerChoice} beats ${computerChoice}`);
  } else if (result === 0) {
    console.log(`It's a draw! both players chose ${playerChoice}`);
  } else {
    console.log(`You loose! ${computerChoice} beats ${playerChoice}`);
  }
};

function logFinalResult(score) {
  const finalScore = `${score['player']} to ${score['computer']}`;

  if (score['player'] > score['computer']) {
    console.log(`Congratulations Player! You have won the game with a score of ${finalScore}`);
  } else if (score['player'] === score['computer']) {
    console.log(`The game ended in a draw at ${finalScore}`);
  } else {
    console.log(`You have lost the game with a score of ${finalScore}`);
  }
};

function game(rounds = 5) {
  console.clear();
  let score = { player: 0, computer: 0 };

  let playerChoice, computerChoice;
  for (let i = 1; i <= rounds; i++) {
    console.log(`Round: ${i} of ${rounds}, Score: Player: ${score['player']} Computer: ${score['computer']}`);

    playerChoice   = playerSelection();
    computerChoice = getComputerChoice();
    result = playRound(playerChoice, computerChoice);
    logRoundResult(result, playerChoice, computerChoice);

    if (result === 1) score['player'] += 1;
    if (result === -1) score['computer'] += 1;
  }

  logFinalResult(score);

  let playAgain = prompt('Play again? (y/n)');
  while (!['y', 'n'].includes(playAgain)) {
    playAgain = prompt('Play again? (y/n)').toLowerCase();
  }

  return playAgain === 'y' ? game(rounds) : null;
};
