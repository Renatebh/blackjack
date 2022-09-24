import React from "react";
import Decks from "./Decks";
import { randomDealerArray } from "./RandomDeckArray";

const DisplayDealerDeck = () => {
  return (
    <div className="decks">
      {randomDealerArray.map((ind, val) => {
        return (
          <Decks
            key={val}
            suits={ind.suits}
            card={ind.card}
            color={ind.color}
            index={ind.index}
          />
        );
      })}
    </div>
  );
};

export default DisplayDealerDeck;
