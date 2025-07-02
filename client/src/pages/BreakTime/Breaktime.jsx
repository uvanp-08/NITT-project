import React from "react";
import { Link } from "react-router-dom";
import "./Breaktime.css";
import tictactoeImg from "../../images/tictactoe.png";
import sudokuImg from "../../images/sudoku.jpg";
import MemoryImg from "../../images/memorygame.jpg";
import QuizImg from "../../images/quizme.jpg";
import ReactionImg from "../../images/reactiontimer.png";
import TypingImg from "../../images/typingtest.jpg";

const games = [
  { name: "Tic Tac Toe", path: "/breaktime/tictactoe", Image: tictactoeImg },
  { name: "Sudoku", path: "/breaktime/sudoku", Image: sudokuImg },
  { name: "Memory Game", path: "/breaktime/MemoryGame", Image: MemoryImg },
  { name: "Quiz Me", path: "/breaktime/quiz-me" , Image: QuizImg },
  { name: "Reaction Timer", path: "/breaktime/reaction-timer", Image: ReactionImg },
  { name: "Typing Test", path: "/breaktime/typing-test", Image: TypingImg }
];

const Breaktime = () => {
  return (
    <div className="breaktime-container">
      <h2>Breaktime Fun Zone 🎮</h2>
      <p>Take a break and boost your brain!</p>
      <div className="game-grid">
        {games.map((game) => (
          <Link key={game.name} to={game.path} className="game-card">
            <h3 className="game-title">{game.name}</h3>
            {game.Image && (
              <img src={game.Image} alt={game.name} className="game-image" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Breaktime;
