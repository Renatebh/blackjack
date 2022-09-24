import React, { useState } from "react";
import "./startMenu.css";

const StartMenu = ({ onStartClick }) => {
  const [name, setName] = useState("");
  localStorage.setItem("username", name);
  const handleSubmit = (e) => {
    console.log(name);
  };

  return (
    <div className="main">
      <h1>Blackjack</h1>

      <input
        value={name}
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="startButton"
        onClick={() => {
          onStartClick();
          handleSubmit();
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default StartMenu;
