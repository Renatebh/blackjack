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

// export default DisplayDealerDeck;
//Del ut kort
// const dealCards = () => {
//   setActive(true);
//   // sumCards();
// };

// Sum your og dealer hand

// const sumCards = () => {
//   for (let i = 0; i < hand.length; i++) {
//     yourScore += hand[i].value;
//   }
//   for (let i = 0; i < dealerHand.length; i++) {
//     dealerScore += dealerHand[i].value;
//   }
//   console.log("your score", yourScore);
//   // console.log("dealer score", dealerScore);
//   // if (yourScore >= 21) {
//   //   setButton(true);
//   // }
//   setYourSum(yourScore);
//   setDealerSum(dealerScore);
// };
