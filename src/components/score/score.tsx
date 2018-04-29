import * as LeftPad from "left-pad";
import * as React from "react";
import * as Styles from "./styles.css";

// Broken typings.
const leftPad = (LeftPad as any).default;

export const Score: React.SFC<{
  highScore: number,
  score: number,
}> = (
  { highScore, score },
) => (
  <div className={Styles.score}>
    <div>
      <span className={Styles.label}>Score:</span>
      <span className={Styles.value}>{leftPad(score, 7, 0)}</span>
    </div>
    <div>
      <span className={Styles.label}>High Score:</span>
      <span className={Styles.value}>{leftPad(highScore, 7, 0)}</span>
    </div>
  </div>
);
