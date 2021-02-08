import React from 'react';
import { Control } from '../Control/Control';
import './KeyboardControls.scss';
import { Direction } from '../../../utils/field/types';
import { nanoid } from 'nanoid';

interface Prop {
  controlState: ControlState;
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

  private icons: {[key in Direction]: JSX.Element} = {
    Left: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(30, 47, 27)" width="32px" height="32px"><path d="M14 7l-5 5 5 5V7z"/><path d="M24 0v24H0V0h24z" fill="none"/></svg>,
    Top: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(30, 47, 27)" width="32px" height="32px"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 14l5-5 5 5z"/></svg>,
    Down: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(30, 47, 27)" width="32px" height="32px"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 10l5 5 5-5z"/></svg>,
    Right: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(30, 47, 27)" width="32px" height="32px"><path d="M10 17l5-5-5-5v10z"/><path d="M0 24V0h24v24H0z" fill="none"/></svg>
  }

  private renderControls() {
    const controls: JSX.Element [] = [];

    for (const key of Object.keys(this.props.controlState)) {
      const icon: JSX.Element = this.icons[key as Direction];
      const className: string = this.props.controlState[key as Direction] ? 'control_colored' : '';
      const id = nanoid();

      controls.push(
        <Control key={id} className={className} icon={icon}/>
      )
    }
    return controls;
  }

  public render() {
    const kek = String(Object.values(this.props.controlState));
    return <div className="controls">
            {this.renderControls()}
          </div>
  }
}
