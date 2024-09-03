import React, { useState } from "react";

// Winning combinations for the game board
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

// Determines the winner based on the current board state
function determineWinner(board) {
  for (let [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Represents a single cell on the game board
function Cell({ index, value, onCellClick }) {
  return (
    <button
      className="cell"
      onClick={() => onCellClick(index)}
      disabled={value}
    >
      {value}
    </button>
  );
}

// Main TicTacToe game component
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setXIsPlaying] = useState(true);
  const winner = determineWinner(board);

  // Handles cell click to mark X or O
  const handleCellClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = xIsPlaying ? "X" : "O";
    setBoard(newBoard);
    setXIsPlaying(!xIsPlaying);
  };

  // Resets the game to its initial state
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsPlaying(true);
  };

  // Generates the status message displayed to the players
  const getStatusMessage = () => {
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return "It's a draw!";
    return `Player ${xIsPlaying ? "X" : "O"}'s turn`;
  };

  return (
    <div className="app">
      <div aria-live="polite">{getStatusMessage()}</div>
      <div className="board">
        {board.map((value, index) => (
          <div className="board-row">
            <Cell
              key={index}
              index={index}
              value={value}
              onCellClick={handleCellClick}
            />
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
}

export default TicTacToe;
