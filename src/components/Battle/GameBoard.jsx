import React, { useState, useEffect } from "react";
import "../../App.css";
import DisplayDeck from "../Deck/DisplayYourDeck";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import {
  randomDealerArray,
  randomDeckArray as hand,
  randomDeckArray,
} from "../Deck/RandomDeckArray";
import { deckArray } from "../Deck/DeckArray";
import { randomIntFromInterval } from "../../hooks/randomNumber";
import DisplayDealerDeck from "../Deck/DisplayDealerDeck";
import Decks from "../Deck/Decks";

const GameBoard = () => {
  const [name, setName] = useState("");
  const [hand, setHand] = useState(randomDeckArray);
  const [dealerHand, setDealerHand] = useState(randomDealerArray);
  const [yourSum, setYourSum] = useState(0);
  const [dealerSum, setDealerSum] = useState(0);
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [button, setButton] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) {
      setName(userName);
      console.log(userName);
    }
  }, []);

  //Del ut kort
  const dealCards = () => {
    setActive(true);
    sumCards();
  };

  // Sum your og dealer hand
  let yourScore = 0;
  let dealerScore = 0;

  const sumCards = () => {
    for (let i = 0; i < hand.length; i++) {
      yourScore += hand[i].value;
    }
    for (let i = 0; i < dealerHand.length; i++) {
      dealerScore += dealerHand[i].value;
    }
    console.log("your score", yourScore);
    // console.log("dealer score", dealerScore);
    // if (yourScore >= 21) {
    //   setButton(true);
    // }
    setYourSum(yourScore);
    setDealerSum(dealerScore);
  };

  const handleHit = () => {
    const rndInt = randomIntFromInterval(0, 51);
    setHand((hand) => [...hand, deckArray[rndInt[1]]]);
    sumCards();
    // checkResults();
  };
  console.log("hand", hand);

  // const handleHold = () => {
  //   console.log(yourSum);
  //   // sumOfYourCards();
  //   checkDealerHand();
  // };

  // const checkDealerHand = () => {
  //   const rndInt = randomIntFromInterval(0, 51);
  //   if (dealerScore < 17) {
  //     randomDealerArray.push(deckArray[rndInt[1]]);
  //     sumOfYourCards();
  //     checkResults();
  //   } else {
  //     checkResults();
  //     console.log("else");
  //   }
  //   console.log("utafor else");
  // };

  // Sjekke resultat
  // const checkResults = () => {
  //   if (yourSum > 21 || (yourSum < dealerScore && dealerScore < 21)) {
  //     setMessage("You lose!");
  //   } else if (yourSum === dealerScore) {
  //     setMessage("Tie!");
  //   } else {
  //     setMessage("You win!");
  //     setHand(randomDeckArray);
  //     setTotalScore(yourSum);
  //   }
  // };

  return (
    <div>
      <div className="header-container">
        <p>Name: {name} </p>
        <p>Results:{message}</p>
        <h1>Blackjack</h1>
        <button>HighScore</button>
      </div>
      <div className="main-container">
        <div>
          <h2>
            You're hand <span className="your-sum">{yourSum}</span>
          </h2>

          <div className={active ? "your-cards" : "hidden"}>
            {/* <DisplayDeck /> */}
            {hand.map((index, value) => {
              return (
                <Decks key={value} card={index.card} suits={index.suits} />
              );
            })}
          </div>
        </div>
        <div className="button-container">
          <p>
            Total score:<span>{totalScore}</span>
          </p>
          <div>
            <PrimaryButton disableBtn={button} text="Hit" onClick={handleHit} />
            <PrimaryButton text="Hold" /*onClick={handleHold}*/ />
          </div>
          <div>
            <PrimaryButton text="Deal Cards" onClick={dealCards} />
            <PrimaryButton text="Finish" />
          </div>
        </div>
        <div>
          <h2>
            Dealer's hand <span className="dealer-sum">{dealerSum}</span>
          </h2>
          <div className={active ? "dealer-cards" : "hidden"}>
            <DisplayDealerDeck />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default GameBoard;
