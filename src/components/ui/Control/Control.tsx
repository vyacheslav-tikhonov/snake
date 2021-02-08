import React from 'react';
import './Control.scss';

interface Prop {
  icon: JSX.Element;
  className?: string;
}

interface State {
  //
}

export class Control extends React.Component<Prop, State> {
  public constructor(prop: Prop) {
    super(prop);
  }

  public render() {
    return <div className={`control ${this.props.className}`}>
            {this.props.icon}
          </div>
  }
}
