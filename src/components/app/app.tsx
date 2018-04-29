import * as React from "react";
import { Score } from "../score/score";
import { Switch } from "../switch/switch";
import { Title } from "../title/title";
import * as Styles from "./styles.css";

export const tickRateMilliseconds = 1000;

export class App extends React.Component<
  {},
  {
    highScore: number;
    isOn: boolean;
    score: number;
  }
> {
  public state = {
    highScore: 0,
    isOn: false,
    score: 0,
  };
  private clickSound = new Audio("click.wav");
  public render() {
    const appStyle = this.state.isOn ? Styles.appLight : Styles.appDark;
    return (
      <div className={appStyle}>
        <Title />
        <div className={Styles.top}>
          <Score
            highScore={this.state.highScore}
            score={this.state.score}
          />
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

    const nextScore = this.state.isOn ? 0 : 1;

    this.setState({
      highScore: Math.max(this.state.highScore, nextScore),
      isOn: !this.state.isOn,
      score: nextScore,
    });
  }
}
