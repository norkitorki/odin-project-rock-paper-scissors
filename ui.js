const roundsSelect = document.getElementById('game-rounds');
const startButton  = document.querySelector('.start-game');
let roundsCount    = 5;

roundsSelect.addEventListener('change', (e) => roundsCount = Number(e.target.value));

startButton.addEventListener('click', () => roundsCount > 0 ? game(roundsCount) : alert('Minimum number of rounds is 1'));
