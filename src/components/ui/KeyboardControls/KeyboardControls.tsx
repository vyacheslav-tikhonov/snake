import React from 'react';
import { Control } from '../Control/Control';
import './KeyboardControls.scss';

interface Prop {
  //
}

interface State {
  //
}

export class KeyboardControls extends React.Component<Prop, State> {
  public constructor(prop: Prop) {
    super(prop);
  }

  private icons(): JSX.Element[] {
    return [
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="32px" height="32px"><path d="M14 7l-5 5 5 5V7z"/><path d="M24 0v24H0V0h24z" fill="none"/></svg>,
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="32px" height="32px"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 14l5-5 5 5z"/></svg>,
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="32px" height="32px"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 10l5 5 5-5z"/></svg>,
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="32px" height="32px"><path d="M10 17l5-5-5-5v10z"/><path d="M0 24V0h24v24H0z" fill="none"/></svg>
    ]
  }

  private renderControls() {
    return this.icons().map((icon: JSX.Element) => {
      return <Control icon={icon}/>;
    })
  }

  public render() {
    return <div className="controls">
            {this.renderControls()}
          </div>
  }
}
