import React, { useState, useEffect } from "react";
import "../../App.css";
import PrimaryButton from "../Buttons/PrimaryButton";
import {
  randomDealerArray,
  randomDeckArray as hand,
  randomDeckArray,
} from "../Deck/RandomDeckArray";
import { deckArray } from "../Deck/DeckArray";
import { randomIntFromInterval } from "../../hooks/randomNumber";
import Decks from "../Deck/Decks";
import { calculateScore } from "../../hooks/calculateScore";

const GameBoard = () => {
  const [name, setName] = useState("");
  const [hand, setHand] = useState(randomDeckArray);
  const [dealerHand, setDealerHand] = useState(randomDealerArray);

  const [yourSum, setYourSum] = useState(0);
  const [dealerSum, setDealerSum] = useState(0);
  const [message, setMessage] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [button, setButton] = useState(false);
  const [newHand, setNewHand] = useState([]);

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) {
      setName(userName);
      console.log(userName);
    }
  }, []);

  let playerScore = calculateScore(hand);
  let dealerScore = calculateScore(dealerHand);

  console.log("din sum", yourSum);
  console.log("dealer sum", dealerSum);

  useEffect(() => {
    setDealerSum(dealerScore);
    setYourSum(playerScore);
  });

  // Hit button
  const handleHit = () => {
    const rndInt = randomIntFromInterval(0, 51);
    setHand((hand) => [...hand, deckArray[rndInt[1]]]);

    const newPlayerCards = [...hand, deckArray[rndInt[1]]];
    const newPlayerScore = calculateScore(newPlayerCards);
    setYourSum(newPlayerScore);

    if (newPlayerScore > 21) {
      setMessage("You lose");
    }
  };

  // Sjekke hold
  const handleHold = () => {
    const rndInt = randomIntFromInterval(0, 51);
    const newDealerCards = [...dealerHand, deckArray[rndInt[1]]];
    const newDealerScore = calculateScore(newDealerCards);
    console.log("SCORE", dealerScore);

    if (dealerScore < 17) {
      setDealerHand((dealerHand) => [...dealerHand, deckArray[rndInt[0]]]);
      setDealerSum(newDealerScore);
    }
    console.log("NEW SCORE", newDealerScore);
    console.log(dealerHand);

    if (newDealerScore > 21) {
      setMessage("You win!");
    } else if (yourSum == newDealerScore) {
      setMessage("Tie!");
    } else if (yourSum < newDealerScore) {
      setMessage("You Lose!");
    } else return;
  };

  return (
    <div>
      <div className="header-container">
        <p>Name: {name} </p>
        <h1>Blackjack</h1>
        <button>HighScore</button>
      </div>
      <p>Results:{message}</p>
      <div className="main-container">
        <div>
          <h2>
            You're hand <span className="your-sum">{yourSum}</span>
          </h2>

          {/* <div className={active ? "your-cards" : "hidden"}>
            {<DisplayDeck /> }
          </div> */}
          <div className="your-cards">
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
            <PrimaryButton text="Hold" onClick={handleHold} />
          </div>
          <div>
            {/* <PrimaryButton text="Deal Cards" onClick={dealCards} /> */}
            <PrimaryButton text="Finish" />
          </div>
        </div>
        <div>
          <h2>
            Dealer's hand <span className="dealer-sum">{dealerSum}</span>
          </h2>
          <div className="dealer-cards">
            {dealerHand.map((index, value) => {
              return (
                <Decks key={value} card={index.card} suits={index.suits} />
              );
            })}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default GameBoard;
