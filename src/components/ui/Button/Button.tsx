import React from 'react';
import './Button.scss';

interface Prop {
  onClickFunction: (event: React.MouseEvent) => void;
  text?: string;
  className?: string;
}

interface State {
  //
}

export class Button extends React.Component<Prop, State> {
  public constructor(prop: Prop) {
    super(prop);
    this.onClick = this.onClick.bind(this);
  }

  private onClick(event: React.MouseEvent) {
    this.props.onClickFunction(event);
  }

  public render() {
    return <div>
            <button
              className={`${this.props.className} button`}
              onClick={(event) => this.onClick(event)}
            >
              {this.props.text}
            </button>
          </div>
  }
}
