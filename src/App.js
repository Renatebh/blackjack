import React, { useState } from "react";
import "./App.css";
import PrimaryButton from "./components/PrimaryButton";

const App = () => {
  const [name, setName] = useState("");

  const startGame = (e) => {
    e.preventDefault();
    const name = prompt(`Skriv inn navnet ditt`);
    setName(name);
    console.log(name);
  };

  return (
    <>
      <div className="header-container">
        <p>Name: {name}</p>
        <h1>Blackjack</h1>
        <button>HighScore</button>
      </div>
      <div className="main-container">
        <div>
          <h2>You(0)</h2>
        </div>
        <div className="button-container">
          <p>Total score:(0)</p>
          <div>
            <PrimaryButton text="Hit" />
            <PrimaryButton text="Hold" />
          </div>
          <div>
            <PrimaryButton text="Start" onClick={startGame} />
            <PrimaryButton text="Finish" />
          </div>
        </div>
        <div>
          <h2>Dealer</h2>
        </div>
      </div>
    </>
  );
};

export default App;
