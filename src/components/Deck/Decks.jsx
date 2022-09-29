import React from "react";
import "./Decks.css";

const Decks = (props) => {
  return (
    <div className="deck">
      <img src={props.image} alt="bildet av et kort" />
    </div>
  );
};

export default Decks;
