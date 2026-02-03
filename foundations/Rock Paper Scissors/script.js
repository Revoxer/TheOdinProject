function playGame() {
  let result;
  let humanScore = 0;
  let computerScore = 0;

  function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    let computerChoice;
    if (randomNumber === 0) {
      computerChoice = "rock";
    } else if (randomNumber === 1) {
      computerChoice = "paper";
    } else {
      computerChoice = "scissors";
    }

    return computerChoice;
  }

  function getHumanChoice() {
    let humanChoice = prompt("Please enter: Rock, Paper or Scissors: ");

    return humanChoice.toLowerCase();
  }

  function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
      console.log("It's draw!");
    } else if (
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "scissors" && computerChoice === "paper")
    ) {
      console.log(`You win! ${humanChoice} beats ${computerChoice}`);
      humanScore++;
    } else {
      console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
      computerScore++;
    }
  }

  const humanSelection = getHumanChoice();
  const computerSelection = getComputerChoice();

  playRound(humanSelection, computerSelection);

  const humanSelection2 = getHumanChoice();
  const computerSelection2 = getComputerChoice();

  playRound(humanSelection2, computerSelection2);

  const humanSelection3 = getHumanChoice();
  const computerSelection3 = getComputerChoice();

  playRound(humanSelection3, computerSelection3);

  const humanSelection4 = getHumanChoice();
  const computerSelection4 = getComputerChoice();

  playRound(humanSelection4, computerSelection4);

  const humanSelection5 = getHumanChoice();
  const computerSelection5 = getComputerChoice();

  playRound(humanSelection5, computerSelection5);

  if (humanScore === computerScore) {
    result = "It's draw!";
  } else if (humanScore > computerScore) {
    result = `You win with ${humanScore} win rounds against computer's ${computerScore} win rounds`;
  } else {
    result = `You lose with ${humanScore} win rounds against computer's ${computerScore} win rounds`;
  }

  return result;
}

console.log(playGame());
