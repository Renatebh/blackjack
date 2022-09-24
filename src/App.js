import React, { useState } from "react";
import "./App.css";
// import DisplayDeck from "./components/Deck/DisplayDeck";
// import PrimaryButton from "./components/Buttons/PrimaryButton";
// import {
//   randomDealerArray,
//   randomDeckArray,
// } from "./components/Deck/RandomDeckArray";
// import { deckArray } from "./components/Deck/DeckArray";
// import { randomIntFromInterval } from "./hooks/randomNumber";
// import DisplayDealerDeck from "./components/Deck/DisplayDealerDeck";
import StartMenu from "./components/Start/StartMenu";
import GameBoard from "../src/components/Battle/GameBoard.jsx";

const App = () => {
  // const [name, setName] = useState("");
  // const [yourSum, setYourSum] = useState(0);
  // const [dealerSum, setDealerSum] = useState(0);
  // // const [yourHand, setYourHand] = useState([]);
  // const [active, setActive] = useState(false);
  const [mode, setMode] = useState("start");

  // let randomDeckArray = [];
  //Start spillet
  // const startGame = (e) => {
  //   const name = prompt(`Skriv inn navnet ditt`);
  //   setName(name);
  //   setActive(true);
  //   sumOfYourCards();
  // };

  // const hit = () => {
  //   const rndInt = randomIntFromInterval(0, 51);
  //   console.log("a: " + rndInt[0], "b: " + rndInt[1]);
  //   randomDeckArray.push(deckArray[rndInt[0]]);

  //   sumOfYourCards();
  // };
  // console.log(deckArray);
  // console.log(randomDeckArray);

  // Sum your hand
  // let yourScore = 0;
  // let dealerScore = 0;
  // const sumOfYourCards = () => {
  //   for (let i = 0; i < randomDeckArray.length; i++) {
  //     yourScore += randomDeckArray[i].value;
  //   }
  //   for (let i = 0; i < randomDealerArray.length; i++) {
  //     dealerScore += randomDealerArray[i].value;
  //   }
  //   setYourSum(yourScore);
  //   setDealerSum(dealerScore);
  //   console.log(yourScore);
  // };

  // sumOfYourCards();
  // sumCards();
  // setYourSum(yourSum);

  return (
    <>
      <div className="main"></div>
      {mode === "start" && <StartMenu onStartClick={() => setMode("battle")} />}
      {mode === "battle" && <GameBoard />}

      {mode === "gameOver" && <>Game Over</>}

      {/* <div className="header-container">
        <p>Name: {name} </p>
        <h1>Blackjack</h1>
        <button>HighScore</button>
      </div>
      <div className="main-container">
        <div>
          <h2>
            You're hand <span className="your-sum">{yourSum}</span>
          </h2>

          <div
            // className="your-cards "
            className={active ? "your-cards" : "hidden"}
          >
            <DisplayDeck />
          </div>
        </div>
        <div className="button-container">
          <p>
            Total score:<span>0</span>
          </p>
          <div>
            <PrimaryButton text="Hit" onClick={hit} />
            <PrimaryButton text="Hold" />
          </div>
          <div>
            <PrimaryButton text="Start" onClick={startGame} />
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
      <div>
        <p>Results:</p>
      </div> */}
    </>
  );
};

export default App;
