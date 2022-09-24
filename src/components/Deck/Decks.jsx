import React from "react";
import "./Decks.css";

const Decks = (props) => {
  return (
    <div className="deck">
      <p>{props.suits}</p>
      <p>{props.card}</p>
      <p>{props.color}</p>
      <p>{props.index}</p>
    </div>
  );
};

export default Decks;
