const startButton = document.querySelector('.start-game');
const CHOICES = [ 'Rock', 'Paper', 'Scissors' ];

function getComputerChoice() {
  const index = Math.floor(Math.random() * 3);
  return CHOICES[index];
};
