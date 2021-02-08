import React from 'react';
import { Control } from '../Control/Control';
import './KeyboardControls.scss';
import { Direction } from '../../../utils/field/types';

interface Prop {
  controlState: ControlState;
  onClick: (direction: Direction) => void;
}

interface State {
  //
}

export type ControlState = {
  [key in Direction]: boolean;
}

export class KeyboardControls extends React.Component<Prop, State> {
  public constructor(prop: Prop) {
    super(prop);
  }

  public render() {
    const kek = String(Object.values(this.props.controlState));
    return <div className="controls">
            <Control
              onClick={this.props.onClick}
              direction="Left"
              className={this.props.controlState.Left ? 'control_colored' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(30, 47, 27)" width="32px" height="32px"><path d="M14 7l-5 5 5 5V7z"/><path d="M24 0v24H0V0h24z" fill="none"/></svg>
            </Control>
            <Control 
              onClick={this.props.onClick}
              direction="Top"
              className={this.props.controlState.Top? 'control_colored' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(30, 47, 27)" width="32px" height="32px"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 14l5-5 5 5z"/></svg>
            </Control>
            <Control
              onClick={this.props.onClick}
              direction="Down"
              className={this.props.controlState.Down? 'control_colored' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(30, 47, 27)" width="32px" height="32px"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 10l5 5 5-5z"/></svg>
            </Control>
            <Control
              onClick={this.props.onClick}
              direction="Right"
              className={this.props.controlState.Right? 'control_colored' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(30, 47, 27)" width="32px" height="32px"><path d="M10 17l5-5-5-5v10z"/><path d="M0 24V0h24v24H0z" fill="none"/></svg>
            </Control>
          </div>
  }
}
