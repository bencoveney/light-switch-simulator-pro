import * as React from "react";
import * as Styles from "./styles.css";

export const Score: React.SFC<{
  score: number,
}> = (
  { score },
) => (
  <div className={Styles.score}>
    Score: {score}
  </div>
);
