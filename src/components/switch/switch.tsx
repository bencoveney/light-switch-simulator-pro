import * as React from "react";
import * as Styles from "./styles.css";

export const Switch: React.SFC<{
  isOn: boolean,
  toggle: () => void,
}> = (
  { isOn, toggle },
) => (
  <div className={Styles.lightswitch}>
    <div className={Styles.screw} />
    <a onClick={toggle} className={Styles.button} />
    <div className={Styles.screw} />
  </div>
);
