import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";

const ReactionTimer = () => {
  const [state, setState] = useState("waiting"); // waiting, ready, now, tooSoon, done
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (state === "ready") {
      timer = setTimeout(() => {
        setStartTime(Date.now());
        setState("now");
      }, Math.floor(Math.random() * 3000) + 2000); // 2-5 sec random delay
    }
    return () => clearTimeout(timer);
  }, [state]);

  const handleClick = () => {
    if (state === "waiting") {
      setState("ready");
    } else if (state === "ready") {
      setState("tooSoon");
    } else if (state === "now") {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
      setState("done");
    } else if (state === "tooSoon" || state === "done") {
      setReactionTime(null);
      setState("waiting");
    }
  };

  return (
    <div className="game-container">
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <h3>Reaction Timer ⚡</h3>
      <div className={`reaction-box ${state}`} onClick={handleClick}>
        {state === "waiting" && "Click to start"}
        {state === "ready" && "Wait for green..."}
        {state === "now" && "CLICK!"}
        {state === "tooSoon" && "Too Soon! Click to try again."}
        {state === "done" && `Your time: ${reactionTime} ms (Click to retry)`}
      </div>
    </div>
  );
};

export default ReactionTimer;
