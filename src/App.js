import React, { useState } from "react";
import "./App.css";
import StartMenu from "./components/Start/StartMenu";
import GameBoard from "../src/components/Game/GameBoard.jsx";
import HighScoreList from "./components/HighScore/HighScoreList";

const App = () => {
  const [mode, setMode] = useState("start");

  return (
    <>
      <div className="main"></div>
      {mode === "start" && <StartMenu onStartClick={() => setMode("game")} />}
      {mode === "game" && (
        <GameBoard onStartClick={() => setMode("highScore")} />
      )}
      {mode === "highScore" && (
        <HighScoreList onStartClick={() => setMode("game")} />
      )}
    </>
  );
};

export default App;
