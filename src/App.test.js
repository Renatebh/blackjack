import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameBoard from "./components/Game/GameBoard";

test("Blackjack", () => {
  render(<GameBoard onStartClick={() => console.log("highScore")} />);
  const headElement = screen.getByText(/Blackjack/);
  expect(headElement).toBeInTheDocument();
});
