let humanScore = 0;
let computerScore = 0;
let roundCount = 0;
const maxRounds = 5;

const resultDiv = document.getElementById("result");
const scoreDiv = document.getElementById("score");
const choicesDiv = document.getElementById("choices");

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function playRound(humanChoice) {
  if (roundCount >= maxRounds) {
    return;
  }

  roundCount++;
  const computerChoice = getComputerChoice();

  let roundResult;
  if (humanChoice === computerChoice) {
    roundResult = `Round ${roundCount}: Draw! (${humanChoice} vs ${computerChoice})`;
  } else if (
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    roundResult = `Round ${roundCount}: You win! ${humanChoice} beats ${computerChoice}`;
  } else {
    computerScore++;
    roundResult = `Round ${roundCount}: You lose! ${computerChoice} beats ${humanChoice}`;
  }

  resultDiv.textContent = roundResult;
  scoreDiv.textContent = `Points after round ${roundCount}/${maxRounds}: You ${humanScore} - Computer ${computerScore}`;

  if (roundCount === maxRounds) {
    choicesDiv.style.display = "none";

    let finalResult;
    if (humanScore > computerScore) {
      finalResult = `You win! ${humanScore}-${computerScore}`;
    } else if (computerScore > humanScore) {
      finalResult = `You lose! ${humanScore}-${computerScore}`;
    } else {
      finalResult = `It's draw! ${humanScore}-${computerScore}`;
    }

    resultDiv.innerHTML = `<h2>${finalResult}</h2><p>Game finished (${roundCount}/${maxRounds} rounds)</p>`;
  }
}
