import React, { useState } from "react";
import "./startMenu.css";

const StartMenu = ({ onStartClick }) => {
  const [name, setName] = useState("");

  const findUserLocalStorage = () => {
    window.localStorage.getItem(name);
    if (!window.localStorage.getItem(name)) {
      window.localStorage.setItem(name, 0);
    }
    return { name: name, score: window.localStorage.getItem(name) };
  };

  const handleSubmit = (e) => {
    const user = findUserLocalStorage(name);
    window.localStorage.setItem("currentUser", name);
  };

  return (
    <div className="start-container">
      <h1 className="header-blackjack">Blackjack</h1>

      <input
        className="name-input"
        value={name}
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="start-button"
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
