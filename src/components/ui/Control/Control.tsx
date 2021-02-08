import React from 'react';
import { Direction } from '../../../utils/field/types';
import './Control.scss';

interface Prop {
  direction: Direction;
  onClick: (direction: Direction) => void;
  className?: string;
}

interface State {
  //
}

export class Control extends React.Component<Prop, State> {
  public constructor(prop: Prop) {
    super(prop);
    this.onClick = this.onClick.bind(this);
  }

  private onClick() {
    this.props.onClick(this.props.direction)
  }

  public render() {
    return <div 
            onClick={this.onClick}
            className={`control ${this.props.className}`}>
            {this.props.children}
          </div>
  }
}
