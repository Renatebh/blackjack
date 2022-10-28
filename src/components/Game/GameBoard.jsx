import React, { useState, useEffect } from "react";
import "../../App.css";
import PrimaryButton from "../Buttons/PrimaryButton";
import { deckArray } from "../Deck/DeckArray";
import { randomIntFromInterval } from "../Hooks/randomNumber";
import Decks from "../Deck/Decks";
import { calculateScore } from "../Hooks/calculateScore";
import backCard from "../../image/cardpurple.png";

const GameBoard = ({ onStartClick }) => {
  const [name, setName] = useState("");
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerSum, setPlayerSum] = useState(0);
  const [dealerSum, setDealerSum] = useState(0);
  const [message, setMessage] = useState("");
  const [dealersTurn, setDealersTurn] = useState(false);
  const [button, setButton] = useState(true);
  const [dealButton, setDealButton] = useState();
  const [playerWins, setPlayerWins] = useState(0);
  const [currentHighScore, setCurrentHighScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [styleMessage, setStyleMessage] = useState(false);

  let playerScore = calculateScore(playerHand);
  let dealerScore = calculateScore(dealerHand);

  // SAVE TO LOCALSTORAGE
  const handleHighScoreList = () => {
    setName(name);
    setHighScore(highScore);
    const highScoreList = JSON.parse(
      window.localStorage.getItem("highScoreList") || "[]"
    );

    let highScoreArray = {
      name: name,
      score: highScore,
    };
    highScoreList.push(highScoreArray);
    window.localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setName(currentUser);
    }
  }, []);

  const setNewHighScore = (currentHighScore) => {
    const userName = window.localStorage.getItem("currentUser");
    window.localStorage.getItem(userName);
    const currentScore = window.localStorage.getItem(userName);
    window.localStorage.setItem(
      userName,
      currentHighScore + parseInt(currentScore)
    );
    setHighScore(currentHighScore + parseInt(currentScore));
  };

  useEffect(() => {
    setNewHighScore(currentHighScore);
  }, [currentHighScore]);

  useEffect(() => {
    setDealerSum(dealerScore);
    setPlayerSum(playerScore);
    checkAce();
  }, [playerScore, dealerScore]);

  // CHECK ACE
  const checkAce = () => {
    playerHand.forEach((card) => {
      if (playerScore > 21 && card.card === "A") {
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
    playerScore = calculateScore(newPlayerCards);

    newPlayerCards.forEach((card) => {
      if (playerScore > 17 && card.card === "A") {
        playerScore -= 10;
        // setPlayerSum((prevScore) => prevScore + playerScore - 10);
        setPlayerSum(playerScore - 10);
      }
      // setPlayerSum((prevScore) => playerScore);
      // return setPlayerSum(playerScore - 10);
    });

    console.log("PLAYER SCORE", playerScore);

    if (playerScore > 21) {
      setMessage("You lose");
      setDealButton(false);
      setButton(true);
      setStyleMessage(false);
    }

    setPlayerSum((prevScore) => prevScore, playerScore - 10);
  };

  // useEffect(() => {
  //   setPlayerSum(playerScore);
  // }, [playerHand]);

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
      } else {
        if (newDealerScore > 21) {
          setMessage("You win!");
          setPlayerWins(playerWins + 1);
          setCurrentHighScore(playerSum);
          setStyleMessage(true);
        } else if (newDealerScore < playerScore) {
          setMessage("You win!");
          setStyleMessage(true);
          setPlayerWins(playerWins + 1);
          setCurrentHighScore(playerSum);
        } else if (newDealerScore === playerScore) {
          setMessage("It's a tie!");
        } else if (newDealerScore > playerScore) {
          setMessage("You lose!");
          setStyleMessage(false);
        }
      }
    }
  }, [dealerScore, dealersTurn]);

  const handleHold = () => {
    setDealersTurn(true);
    setButton(true);
    setDealButton(false);
  };

  return (
    <div>
      <div className="main-container">
        <div className="header-container">
          <div className="name-container">
            <p className="name">
              Name:<span>{name}</span>
            </p>
            <p>{/* Wins:<span>{playerWins}||</span> */}</p>
            <p>
              Highscore:<span>{highScore}</span>
            </p>
          </div>
          {<h1 className="header">Blackjack</h1>}
          <div>
            <button
              className="btn-btn highscore"
              onClick={() => {
                onStartClick();
                handleHighScoreList();
              }}
            >
              HighScore
            </button>
            <button className="btn-btn finish">Finish</button>
          </div>
        </div>

        <div className="player">
          <h2>
            PLAYER <span className="your-sum">{playerSum}</span>
          </h2>
          <div className="your-cards">
            <p className={`${styleMessage ? "message" : "lose-message"}`}>
              {message}
            </p>
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
          <PrimaryButton disableBtn={button} text="Hit" onClick={handleHit} />
          <PrimaryButton disableBtn={button} text="Hold" onClick={handleHold} />
          <PrimaryButton
            disableBtn={dealButton}
            text="Deal Cards"
            onClick={dealCards}
          />
        </div>

        <div className="dealer">
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
