import React from 'react';
import { Snake } from '../../utils/snake/snake';
import { GameField } from '../../utils/field/field';
import { FieldSize, Point, Direction, Points, Field } from '../../utils/field/types';
import { MapPoint } from '../ui/MapPoint/MapPoint';
import './Game.scss';
import { Button } from '../../components/ui/Button/Button';
import { nanoid } from 'nanoid';
import { Count } from '../ui/Count/Count';
import { TextBanner } from '../ui/TextBanner/TextBanner';
import { KeyboardControls } from '../ui/KeyboardControls/KeyboardControls';

interface State {
  gameField: Field;
  isGameStarted: boolean;
  isGameFinished: boolean;
  scope: number;
  speed: number;
}

const scopeMultiplier = 20;
const fieldSize: FieldSize = {xLenght: 20, yLenght: 20};
const gameSpeedIncrease = -20;
const gameLevelTime = 30000;
const initialGameSpeed: number = 200;

export default class Game extends React.Component<{}, State> {
  private field = new GameField(fieldSize);
  private snake = new Snake(
    this.field.getSnackInitialCoordinate()
  );
  private direction: Direction = 'Top'; 
  private gameSpeed: number = initialGameSpeed // iterval length in ms
  private speedTimer: NodeJS.Timeout | undefined;
  private timer: NodeJS.Timeout | undefined;
  private speedTimerTime: number = gameLevelTime;

  private directionsQueue: Direction[] = [];

  private controls = {
    ArrowUp: 'Top',
    ArrowRight: 'Right',
    ArrowDown: 'Down',
    ArrowLeft: 'Left',
  }

  private permiteDirection = {
    'Top': 'Down',
    'Right': 'Left',
    'Down': 'Top',
    'Left': 'Rigth'
  }
  
  public constructor(props: any) {
    super(props);

    this.renderMapPoints = this.renderMapPoints.bind(this);
    this.onKeyDown= this.onKeyDown.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onRestart = this.onRestart.bind(this);
    this.processGame = this.processGame.bind(this);
    this.updateGameSpeedTime = this.updateGameSpeedTime.bind(this);

    this.state = { 
      gameField: this.field.getField(),
      isGameStarted: false,
      isGameFinished: false,
      scope: 1 * scopeMultiplier,
      speed: 1
    }
  }

  private initInterval() {
    this.timer = setInterval(this.processGame, this.gameSpeed);
  }

  private initSpeedInterval() {
    this.speedTimer = setInterval(this.updateGameSpeedTime, this.speedTimerTime);
  }

  private updateSpeedInterval() {
    this.clearSpeedInterval();
    this.speedTimerTime = gameLevelTime;
    this.setState({
      speed: this.state.speed + 1
    })
    this.gameSpeed += gameSpeedIncrease;
    this.initSpeedInterval();
    this.clearInterval();
    this.initInterval();
  }

  private clearSpeedInterval() {
    if (this.speedTimer) {
      clearInterval(this.speedTimer);
    }
  }

  private clearInterval() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updateGameSpeedTime() {
    if (this.speedTimerTime) {
      this.speedTimerTime -= 1;
    } {
      this.updateSpeedInterval();
    }
  }

  private updateGameSpeed() {
    this.setState({
      speed: this.state.speed + 1,
    });
    this.clearInterval();
    this.initSpeedInterval();
  }

  private processGame() {
    this.updateDirection();

    try {
      this.snake.crawl(this.direction, this.field);
    } catch(e) {
      this.stopGame();
    }

    this.setState({
      gameField: this.field.getField(),
      scope: this.snake.getLengh() * scopeMultiplier
    });
  }

  private getPointClassName(point: Point): 'snake' | 'food' | 'field' {
    // @ts-ignore
    return Points[point].toLowerCase();
  }

  private updateDirection() {
    const direction = this.directionsQueue.shift();
    if (direction) {
      this.direction = direction;
    }
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (Object.keys(this.controls).indexOf(event.key) !== -1) {
      const key = event.key as 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';
      const direction = this.controls[key] as 'Down' | 'Top' | 'Left' | 'Right';
      if (this.checkRotationPosibility(direction)) {
        this.directionsQueue.push(direction);
      }
    }
  }

  private checkRotationPosibility(direction: Direction): boolean {
    return this.permiteDirection[this.direction] !== direction;
  }

  private setKeydownListener() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  private removeKeydownListener() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  private stopGame() {
    this.onPause();
    this.setState({isGameFinished: true});
  }

  private onRestart() {
    this.field = new GameField(fieldSize);
    this.snake = new Snake(
      this.field.getSnackInitialCoordinate()
    );
    this.setState({
      isGameStarted: false,
      isGameFinished: false,
      scope: 1 * scopeMultiplier,
      speed: 1,
      gameField: this.field.getField()
    })
    this.gameSpeed = initialGameSpeed;
    this.clearInterval();
    this.clearSpeedInterval();
    this.speedTimerTime = gameLevelTime;
    this.direction = 'Top';
  }

  private onPause() {
    this.removeKeydownListener();
    this.clearInterval();
    this.clearSpeedInterval();
    this.setState({isGameStarted: false});
  }

  private onStart() {
    this.setKeydownListener();
    this.initInterval();
    this.initSpeedInterval();
    this.setState({isGameStarted: true});
  }

  public componentDidMount() {
    this.removeKeydownListener();
  }

  public componentWillUnmount() {
    document.removeEventListener("keypress", this.onKeyDown);
  }

  private renderStartButton() {
    return <Button onClickFunction={this.onStart} text="Start"></Button>;
  }

  private renderRestartButton() {
    return <Button onClickFunction={this.onRestart} text="New game"></Button>;
  }

  private renderPauseButton() {
    return <Button onClickFunction={this.onPause} text="Pause"></Button>;
  }

  private renderMapPoints(): React.ReactNode[] {
    const pointsArr: React.ReactNode[] = [];

    for (let row of this.state.gameField) {
      for (let point of row) {
        const id = nanoid();
        pointsArr.push(<div key={id}>
                        <MapPoint className={this.getPointClassName(point)}/>
                      </div>)
      }
    }

    return pointsArr;
  }

  render() {
    let button;

    if (this.state.isGameStarted) {
      button = this.renderPauseButton();
    } else {
      if (this.state.isGameFinished) {
        button = this.renderRestartButton();
      } else {
        button = this.renderStartButton();
      }
    }

    let banner = this.state.isGameFinished ? <TextBanner text="Game Over" /> : '';

    return <div className="game">
            <div className="game__container">
            <h2>Snake</h2>
            <div className="game__counters">
              <Count text="Scope" count={this.state.scope}/>
              <Count text="Speed" count={this.state.speed}/>
            </div>
              <div className="game__field">
                {this.renderMapPoints()}
              </div>
              <div className="game__banner">
                {banner}
              </div>
              <div className="game__buttons">
                <KeyboardControls />
                {button}
              </div>
            </div>
          </div>
  }
}