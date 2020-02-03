// Buttons //
const btnElements = document.querySelectorAll('button[data-selection]');

// Scores //
const gameLength = 5;
let gameCounter, playerScore, computerScore;
const scoreBoard = document.querySelector('p.scoreBoard');
const spanPlayer = document.querySelector('.player');
const spanComputer = document.querySelector('.computer');

// In-Game Messages //
const roundMessage = document.querySelector('p.roundMessage');
const gameMessage = document.querySelector('p.gameMessage');

// Initialization //
playerScore = computerScore = 0;
btnElements.forEach(btn => btn.addEventListener('click', playRound));

function playRound(event) {
  event.stopPropagation();
  
  const playerSelection = this.getAttribute('data-selection');
  const computerSelection = computerPlay();
  const outcome = calculateOutcome(playerSelection, computerSelection);
    
  updateScore(outcome);   
  
  if (playerScore === gameLength || computerScore === gameLength) {
    gameOver();
  } else {
    displayRoundMessage(outcome, playerSelection, computerSelection);
  }
}

function computerPlay() {
  const weapons = ['rock', 'paper', 'scissors'];
  return weapons[randomNumber(weapons.length)];
}

function calculateOutcome(playerSelection, computerSelection) {
  let outcome;
  
  switch(playerSelection) {
    case "rock":
      switch(computerSelection) {
        case "rock":     outcome = "draw"; break;
        case "paper":    outcome = "lose"; break;
        case "scissors": outcome = "win";  break;
      }
      break;
    case "paper":
      switch(computerSelection) {
        case "rock":     outcome = "win"; break;
        case "paper":    outcome = "draw"; break;
        case "scissors": outcome = "lose";  break;
      }
      break;
    case "scissors":
      switch(computerSelection) {
        case "rock":     outcome = "lose"; break;
        case "paper":    outcome = "win"; break;
        case "scissors": outcome = "draw";  break;
      }
      break;
  }

  return outcome;
}

function updateScore(roundStatus) {     
  if (roundStatus == "win") {
    playerScore++;
  } else if (roundStatus == "lose") {
    computerScore++;
  }

  if (roundStatus !== 'draw') {
    scoreBoard.classList.add(roundStatus);
    scoreBoard.classList.add('magnify');
    scoreBoard.addEventListener('transitionend', event => {
      event.target.classList.remove('magnify');
      event.target.classList.remove(roundStatus);
    });
  }
  
  spanPlayer.textContent = playerScore;
  spanComputer.textContent = computerScore;
}

function gameOver() {
  displayGameMessage();
  roundMessage.textContent = '';
  playerScore = computerScore = 0;
  btnElements.forEach(btn => disableButton(btn));

  const btnReset = document.createElement('button');
  btnReset.classList.add('reset');
  btnReset.textContent = 'Start Again';
  btnReset.addEventListener('click', resetGame);
  
  const containerDiv = document.querySelector('.container');
  containerDiv.appendChild(btnReset);
}

function resetGame(event) {
  gameMessage.textContent = '';
  spanPlayer.textContent = '0';
  spanComputer.textContent = '0';
  btnElements.forEach(btn => enableButton(btn));
  event.target.parentNode.removeChild(event.target);
}

function displayGameMessage() {
  let messageColor;
  let message = '';

  if (playerScore > computerScore) {
    message += "Congratulations! You're the winner.";
    messageColor = 'green';
  } else if (playerScore < computerScore) {
    message += "Sorry, the computer won.";
    messageColor = 'red';
  }

  gameMessage.textContent = message;
  gameMessage.style.color = messageColor;
}

function displayRoundMessage(outcome, playerWeapon, computerWeapon) { 
  outcome = capitalize(outcome);
  playerWeapon = capitalize(playerWeapon);
  computerWeapon = capitalize(computerWeapon);
  
  let message = `You ${outcome}!`;
  
  if (outcome == "win") {
    message += ` ${playerWeapon} beats ${computerWeapon}`;
  } else if (outcome == "lose") {
    message += ` ${computerWeapon} beats ${playerWeapon}`;
  }

  roundMessage.textContent = message;
}

function randomNumber(n) {
  return Math.floor(Math.random() * n);
}

function enableButton(btn) {
  btn.disabled = false;
  btn.classList.remove('disabled');
}

function disableButton(btn) {
  btn.disabled = true;
  btn.classList.add('disabled');
}

function capitalize(str) {
  return str && (str[0].toUpperCase() + str.slice(1));
}