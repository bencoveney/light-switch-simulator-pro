import * as React from "react";
import * as Styles from "./styles.css";

interface StyleSet {
  button: string;
  lightSwitch: string;
  screw: string;
}

const onStyles: StyleSet = {
  button: Styles.buttonLight,
  lightSwitch: Styles.lightSwitchLight,
  screw: Styles.screwLight,
};

const offStyles: StyleSet = {
  button: Styles.buttonDark,
  lightSwitch: Styles.lightSwitchDark,
  screw: Styles.screwDark,
};

export const Switch: React.SFC<{
  isOn: boolean,
  toggle: () => void,
}> = (
  { isOn, toggle },
) => {
  const styles = isOn ? onStyles : offStyles;
  return (
    <div className={styles.lightSwitch}>
      <div className={styles.screw} />
      <a onClick={toggle} className={styles.button} />
      <div className={styles.screw} />
    </div>
  );
};
