import { deckArray } from "./DeckArray";
import "../Deck/Decks.css";
import { randomIntFromInterval } from "../../hooks/randomNumber";

// Array med to random kort
export let randomDeckArray = [];
for (let i = 0; i < 2; i++) {
  let randomNumber = Math.floor(Math.random() * deckArray.length);
  randomDeckArray.push(deckArray[randomNumber]);
}

export let randomDealerArray = [];
for (let i = 0; i < 2; i++) {
  let randomNumber = Math.floor(Math.random() * deckArray.length);
  randomDealerArray.push(deckArray[randomNumber]);
}
// const rndInt = randomIntFromInterval(0, 51);
// randomDealerArray.push(deckArray[rndInt[0]]);
