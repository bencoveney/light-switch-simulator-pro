import * as React from "react";
import * as Styles from "./styles.css";

export const Score: React.SFC<{
  highScore: number,
  score: number,
}> = (
  { highScore, score },
) => (
  <div className={Styles.score}>
    <span>Score: {score}</span>
    <span>High Score: {highScore}</span>
  </div>
);
