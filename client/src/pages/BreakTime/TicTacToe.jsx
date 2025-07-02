import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const navigate = useNavigate();

  const winner = calculateWinner(board);
  const isBoardFull = board.every(cell => cell !== null);

  useEffect(() => {
    if (!xTurn && !winner && !isBoardFull) {
      const timer = setTimeout(() => {
        const move = getBestMove(board);
        if (move !== -1) {
          const newBoard = board.slice();
          newBoard[move] = "O";
          setBoard(newBoard);
          setXTurn(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xTurn, board, winner]);

  const handleClick = (index) => {
    if (board[index] || winner || !xTurn) return;
    const newBoard = board.slice();
    newBoard[index] = "X";
    setBoard(newBoard);
    setXTurn(false);
  };

  const getBestMove = (board) => {
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) return i;
    }
    return -1;
  };

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  };

  return (
    <section>
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <div className="game-container">
      <h3>Tic Tac Toe</h3>
      <div className="board">
        {board.map((val, i) => (
          <div className="square" key={i} onClick={() => handleClick(i)}>
            {val}
          </div>
        ))}
      </div>
      <p className="status">
        {winner
          ? `Winner: ${winner}`
          : isBoardFull
          ? "It's a Draw!"
          : `Next: ${xTurn ? "X (You)" : "O (Computer)"}`}
      </p>

      {(winner || isBoardFull) && (
        <button className="play-again" onClick={handleRestart}>
          Play Again
        </button>
      )}
    </div>
    </section>
    
  );
};

export default TicTacToe;
