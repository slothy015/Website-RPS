// ----- Rock Paper Scissors -----
let wins = 0, losses = 0, ties = 0;

function playRPS(playerChoice) {
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

  document.getElementById('rpsResult').textContent = resultText;
  document.getElementById('rpsScore').textContent = `Wins: ${wins} | Losses: ${losses} | Ties: ${ties}`;
}

// ----- Tic Tac Toe with Difficulty -----
let tttBoard = Array(9).fill(null);
let tttCurrentPlayer = "X";
let tttGameOver = false;
let tttDifficulty = 'hard'; // Default is Hard

const boardContainer = document.getElementById("ticTacToeBoard");
const statusText = document.getElementById("tttStatus");

function createTicTacToeBoard() {
  boardContainer.innerHTML = "";
  tttBoard.forEach((cell, index) => {
    const div = document.createElement("div");
    div.textContent = cell || "";
    div.addEventListener("click", () => handlePlayerMove(index));
    boardContainer.appendChild(div);
  });
}

function handlePlayerMove(index) {
  if (tttBoard[index] || tttGameOver || tttCurrentPlayer !== "X") return;

  tttBoard[index] = "X";
  updateGame();

  if (!tttGameOver) {
    setTimeout(computerMove, 400); // delay for AI move
  }
}

function updateGame() {
  createTicTacToeBoard();
  const winner = getWinner();
  if (winner) {
    statusText.textContent = `🎉 Player ${winner} wins!`;
    tttGameOver = true;
  } else if (!tttBoard.includes(null)) {
    statusText.textContent = "🤝 It's a draw!";
    tttGameOver = true;
  } else {
    tttCurrentPlayer = tttCurrentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${tttCurrentPlayer}'s turn`;
  }
}

function getWinner(board = tttBoard) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// ----- Minimax AI for Hard Mode -----
function getBestMove(board) {
  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

function minimax(board, depth, isMaximizing) {
  const winner = getWinner(board);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (!board.includes(null)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        best = Math.max(score, best);
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        best = Math.min(score, best);
      }
    }
    return best;
  }
}

// ----- Medium and Easy AI -----
function computerMove() {
  if (tttDifficulty === "hard") {
    const bestMove = getBestMove(tttBoard);
    tttBoard[bestMove] = "O";
  } else if (tttDifficulty === "medium") {
    const bestMove = getMediumMove(tttBoard);
    tttBoard[bestMove] = "O";
  } else {
    const randomMove = getRandomMove(tttBoard);
    tttBoard[randomMove] = "O";
  }
  updateGame();
}

function getMediumMove(board) {
  // First, check if the AI can win or block a win
  const winningMove = getWinningMove(board, "O");
  if (winningMove !== null) return winningMove;

  const blockMove = getWinningMove(board, "X");
  if (blockMove !== null) return blockMove;

  // Otherwise, pick a random move
  return getRandomMove(board);
}

function getWinningMove(board, player) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = player;
      if (getWinner(board) === player) {
        board[i] = null;
        return i;
      }
      board[i] = null;
    }
  }
  return null;
}

function getRandomMove(board) {
  const emptyIndexes = board.map((val, i) => val === null ? i : null).filter(i => i !== null);
  return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
}

// ----- Difficulty Selector -----
function updateDifficulty() {
  const difficulty = document.getElementById("difficulty").value;
  tttDifficulty = difficulty;
  resetTicTacToe(); // Reset game when difficulty changes
}

function resetTicTacToe() {
  tttBoard = Array(9).fill(null);
  tttCurrentPlayer = "X";
  tttGameOver = false;
  statusText.textContent = "Player X's turn";
  createTicTacToeBoard();
}

// Init board on page load
createTicTacToeBoard();
