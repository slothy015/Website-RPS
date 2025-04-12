let wins = 0, losses = 0, ties = 0;

function play(playerChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  let resultText = '';

  if (playerChoice === computerChoice) {
    resultText = `🤝 It's a tie! You both chose ${playerChoice}.`;
    ties++;
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    resultText = `🎉 You win! ${playerChoice} beats ${computerChoice}.`;
    wins++;
  } else {
    resultText = `💥 You lose! ${computerChoice} beats ${playerChoice}.`;
    losses++;
  }

  document.getElementById('result').textContent = resultText;
  document.getElementById('score').textContent = `Wins: ${wins} | Losses: ${losses} | Ties: ${ties}`;
}
