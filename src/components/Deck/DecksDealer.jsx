import React from "react";
import "./Decks.css";

const Decks = (props) => {
  return (
    <div className="deck">
      {/* <p>{props.suits}</p>
      <p>{props.card}</p>
      <p>{props.color}</p>
      <p>{props.index}</p> */}
      <img src={props.image} alt="bildet av et kort" />
    </div>
  );
};

export default Decks;
