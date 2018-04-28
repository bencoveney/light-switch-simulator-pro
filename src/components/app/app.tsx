import * as React from "react";
import { Score } from "../score/score";
import { Switch } from "../switch/switch";
import * as Styles from "./styles.css";

export const tickRateMilliseconds = 1000;

export class App extends React.Component<
  {},
  {
    score: number;
    isOn: boolean;
  }
> {
  public state = { score: 0, isOn: false };
  private clickSound = new Audio("click.wav");
  public render() {
    return (
      <div className={Styles.app}>
        <div className={Styles.top}>
          <Score score={this.state.score} />
        </div>
        <div className={Styles.center}>
          <Switch isOn={this.state.isOn} toggle={this.toggle} />
        </div>
      </div>
    );
  }
  private toggle = () => {
    this.clickSound.pause();
    this.clickSound.currentTime = 0;
    this.clickSound.play();
    this.setState({
      isOn: !this.state.isOn,
      score: this.state.isOn ? 0 : 1,
    });
  }
}
