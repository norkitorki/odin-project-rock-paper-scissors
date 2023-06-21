const startButton = document.querySelector('.start-game');
const CHOICES = [ 'Rock', 'Paper', 'Scissors' ];

function getComputerChoice() {
  const index = Math.floor(Math.random() * 3);
  return CHOICES[index];
};

function playerSelection() {
  let instructions = `Please input your choice:\n1. ${CHOICES[0]}\n2. ${CHOICES[1]}\n3. ${CHOICES[2]}\n\nOr input 'rock', 'paper', or 'scissors'.`, choice;

  while (!CHOICES.includes(choice)) {
    choice = prompt(instructions);
    choice = CHOICES[Number(choice) - 1] || CHOICES.find(el => el.toLowerCase() === choice.toLowerCase());
  }

  return choice;
};
