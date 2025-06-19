import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";

const initialPuzzle = [
  [5, 3, "", "", 7, "", "", "", ""],
  [6, "", "", 1, 9, 5, "", "", ""],
  ["", 9, 8, "", "", "", "", 6, ""],
  [8, "", "", "", 6, "", "", "", 3],
  [4, "", "", 8, "", 3, "", "", 1],
  [7, "", "", "", 2, "", "", "", 6],
  ["", 6, "", "", "", "", 2, 8, ""],
  ["", "", "", 4, 1, 9, "", "", 5],
  ["", "", "", "", 8, "", "", 7, 9],
];

const solution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const Sudoku = () => {
  const navigate = useNavigate();
  const [puzzle, setPuzzle] = useState(initialPuzzle);
  const [message, setMessage] = useState("");

  const handleChange = (r, c, value) => {
    const newPuzzle = puzzle.map((row, i) =>
      row.map((cell, j) => (i === r && j === c ? (isNaN(value) ? "" : value) : cell))
    );
    setPuzzle(newPuzzle);
  };

  const checkSolution = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (parseInt(puzzle[r][c]) !== solution[r][c]) {
          setMessage("❌ Incorrect! Keep trying.");
          return;
        }
      }
    }
    setMessage("✅ Congratulations! You solved it!");
  };

  return (
    <section>
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <div className="game-container">
      <h3>Sudoku</h3>
      <div className="sudoku-board">
        {puzzle.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <input
              key={`${rIdx}-${cIdx}`}
              className={`sudoku-cell ${
                initialPuzzle[rIdx][cIdx] !== "" ? "prefilled" : ""
              }`}
              type="text"
              maxLength={1}
              value={cell}
              disabled={initialPuzzle[rIdx][cIdx] !== ""}
              onChange={(e) => handleChange(rIdx, cIdx, e.target.value)}
            />
          ))
        )}
      </div>
      <button className="play-again" onClick={checkSolution}>
        Check Solution
      </button>
      <p>{message}</p>
    </div>
    </section>
    
  );
};

export default Sudoku;
