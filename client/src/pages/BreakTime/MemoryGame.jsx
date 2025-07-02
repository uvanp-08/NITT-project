import React, { useEffect, useState } from "react";
import { FaApple, FaBell, FaBeer, FaBolt, FaBug, FaCube, FaHeart, FaStar, FaSmile, FaTree, FaSun, FaMoon, FaAnchor, FaCar, FaCloud, FaFeather, FaFutbol, FaGhost, FaGlobe, FaLeaf, FaRocket, FaSnowflake, FaSmileBeam, FaChessKnight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Game.css";

const icons = [
  <FaApple />, <FaBell />, <FaBeer />, <FaBolt />, <FaBug />,
  <FaCube />, <FaHeart />, <FaStar />, <FaSmile />, <FaTree />,
  <FaSun />, <FaMoon />, <FaAnchor />, <FaCar />, <FaCloud />,
  <FaFeather />, <FaFutbol />, <FaGhost />, <FaGlobe />, <FaLeaf />,
  <FaRocket />, <FaSnowflake />, <FaSmileBeam />, <FaChessKnight />
];

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const MemoryGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [startTime] = useState(Date.now());
  const [time, setTime] = useState(0);

  useEffect(() => {
    const pairIcons = shuffleArray([...icons, ...icons]); // 24 pairs = 48 cards
    const cardDeck = pairIcons.map((icon, index) => ({ id: index, icon, flipped: false }));
    setCards(cardDeck);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].icon.type === cards[second].icon.type) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <section>
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <div className="game-container">
      <h3>Memory Game 🧠</h3>
      <p>Time: {time}s</p>
      <div className="memory-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`memory-card ${flipped.includes(index) || matched.includes(index) ? "flipped" : ""}`}
            onClick={() => handleFlip(index)}
          >
            {(flipped.includes(index) || matched.includes(index)) ? card.icon : "❓"}
          </div>
        ))}
      </div>
      {matched.length === 48 && <p>🎉 You matched all pairs in {time}s!</p>}
    </div>
    </section>
    
  );
};

export default MemoryGame;
