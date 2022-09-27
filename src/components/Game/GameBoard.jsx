import React, { useState, useEffect } from "react";
import "../../App.css";
import PrimaryButton from "../Buttons/PrimaryButton";
import { deckArray } from "../Deck/DeckArray";
import { randomIntFromInterval } from "../../hooks/randomNumber";
import Decks from "../Deck/Decks";
import { calculateScore } from "../../hooks/calculateScore";
import backCard from "../../image/BACK.png";

const GameBoard = () => {
  const [name, setName] = useState("");
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  const [playerSum, setPlayerSum] = useState(0);
  const [dealerSum, setDealerSum] = useState(0);

  const [message, setMessage] = useState("");
  const [dealersTurn, setDealersTurn] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const [button, setButton] = useState(true);
  const [dealButton, setDealButton] = useState();

  let playerScore = calculateScore(playerHand);
  let dealerScore = calculateScore(dealerHand);

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) {
      setName(userName);
      // console.log(userName);
    }
  }, []);

  useEffect(() => {
    setDealerSum(dealerScore);
    setPlayerSum(playerScore);
    checkAce();
  }, [playerScore, dealerScore]);

  // CHECK ACE
  const checkAce = () => {
    console.log("player", playerScore);
    playerHand.forEach((card) => {
      if (playerScore > 20 && card.card === "A") {
        setPlayerSum(playerScore - 10);
      }
    });
  };

  // DEAL CARDS
  const dealCards = () => {
    setMessage("");
    setDealersTurn(false);
    let randomDealerCard = [];
    for (let i = 0; i < 1; i++) {
      let randomNumber = Math.floor(Math.random() * deckArray.length);
      randomDealerCard.push(deckArray[randomNumber]);
      setDealerHand(randomDealerCard);
    }

    let randomPlayerCard = [];
    for (let i = 0; i < 2; i++) {
      let randomNumber = Math.floor(Math.random() * deckArray.length);
      randomPlayerCard.push(deckArray[randomNumber]);
      setPlayerHand(randomPlayerCard);
    }
    setButton(false);
    setDealButton(true);
  };

  // HIT BUTTON
  const handleHit = () => {
    const rndInt = randomIntFromInterval(0, 51);
    setPlayerHand((playerHand) => [...playerHand, deckArray[rndInt[1]]]);

    const newPlayerCards = [...playerHand, deckArray[rndInt[1]]];
    let newPlayerScore = calculateScore(newPlayerCards);

    for (let i = 0; i < newPlayerCards.length; i++) {
      if (newPlayerScore >= 11 && newPlayerCards[i].card === "A") {
        newPlayerScore -= 10;
        setPlayerSum(newPlayerScore);
      }
      if (newPlayerCards[i].card === "A") {
        newPlayerScore -= 10;
        setPlayerSum(newPlayerScore);
      }
      if (newPlayerCards[0].card === "A" && newPlayerCards[1].card === "A") {
        newPlayerScore -= 10;
        setPlayerSum(newPlayerScore);
      }
    }
    checkAce(newPlayerScore);
    setPlayerSum(newPlayerScore);
    console.log(newPlayerScore);
    if (newPlayerScore > 21) {
      setMessage("You lose");
      setDealButton(false);
      setButton(true);
    }
  };

  // HOLD BUTTON
  useEffect(() => {
    if (dealersTurn === true) {
      let newDealerCards = dealerHand;
      let newDealerScore = dealerScore;

      if (newDealerScore < 17) {
        const rndInt = randomIntFromInterval(0, 51);
        newDealerCards = [...dealerHand, deckArray[rndInt[0]]];
        setDealerHand((dealerHand) => [...dealerHand, deckArray[rndInt[0]]]);
        newDealerScore = calculateScore(newDealerCards);
      }

      if (newDealerScore === 21) {
        setMessage("You lose!");
      } else if (newDealerScore > 21) {
        setMessage("You win!");
      } else if (newDealerScore < playerScore) {
        setMessage("You win!");
      } else if (newDealerScore === playerScore) {
        setMessage("It's a tie!");
      } else if (newDealerScore > playerScore) {
        setMessage("You lose!");
      }
    }
  });

  const handleHold = () => {
    setDealersTurn(true);
    setButton(true);
    setDealButton(false);
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
            PLAYER <span className="your-sum">{playerSum}</span>
          </h2>

          {/* <div className={active ? "your-cards" : "hidden"}>
            <PrimaryButton text="Deal" />
          </div> */}
          <div className="your-cards">
            {playerHand.map((index, value) => {
              return (
                <Decks
                  key={value}
                  image={index.image} /*card={index.card} suits={index.suits} */
                />
              );
            })}
          </div>
        </div>
        <div className="button-container">
          <p>
            Total score:<span>{totalScore}</span>
          </p>
          <div className="button-box">
            <PrimaryButton disableBtn={button} text="Hit" onClick={handleHit} />
            <PrimaryButton
              disableBtn={button}
              text="Hold"
              onClick={handleHold}
            />
            <PrimaryButton
              disableBtn={dealButton}
              text="Deal Cards"
              onClick={dealCards}
            />
          </div>
        </div>

        <div>
          <h2>
            DEALER <span className="dealer-sum">{dealerSum}</span>
          </h2>
          <div className="dealer-cards">
            {dealerHand.map((index, value) => {
              return (
                <Decks
                  key={value}
                  image={index.image} /*card={index.card} suits={index.suits} */
                />
              );
            })}
            <img src={backCard} />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default GameBoard;
