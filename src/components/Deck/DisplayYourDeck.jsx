import React from "react";
import { deckArray } from "./DeckArray";
import "../../App.css";

import Decks from "./Decks";
import { randomDeckArray } from "./RandomDeckArray";

const DisplayDeck = () => {
  return (
    <div className="decks">
      {randomDeckArray.map((value, index) => {
        return (
          <Decks
            key={index}
            suits={value.suits}
            card={value.card}
            color={value.color}
            index={value.index}
          />
        );
      })}
    </div>
  );
};

export default DisplayDeck;
