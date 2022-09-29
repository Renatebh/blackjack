import React, { useState, useEffect } from "react";
import List from "./List";
import "./highScore.css";

const HighScoreList = ({ onStartClick }) => {
  const [name, setName] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [highScoreList, setHighScoreList] = useState([]);

  useEffect(() => {
    const currentUser = window.localStorage.getItem("currentUser", name);
    const highScoreList = JSON.parse(
      window.localStorage.getItem("highScoreList") || "[]"
    );

    const sortList = highScoreList.sort(
      (a, b) => parseFloat(b.score) - parseFloat(a.score)
    );

    setHighScoreList(sortList);
    setCurrentUser(currentUser);
  }, []);

  return (
    <div>
      <div className="wrapper">
        <h1>HIGHSCORE</h1>
        <button onClick={onStartClick}>Play</button>
        <p>Innlogget: {currentUser}</p>
        <div className="highscore-list">
          {highScoreList.map((index, value) => {
            return <List key={value} name={index.name} score={index.score} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HighScoreList;
