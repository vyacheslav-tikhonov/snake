import React from 'react';
import './Count.scss';

interface Prop {
  count: number;
  text: string;
}

interface State {
  //
}

export class Count extends React.Component<Prop, State> {
  public constructor(prop: Prop) {
    super(prop);
  }

  public render() {
    return <div className="count">
            <div className="count__title">{this.props.text}:</div>
            <div className="count__result">{this.props.count}</div>
          </div>
  }
}
