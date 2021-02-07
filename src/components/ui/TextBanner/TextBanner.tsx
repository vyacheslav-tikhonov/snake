import React from 'react';
import './TextBanner.scss';

interface Prop {
  text: string;
}

interface State {
  //
}

export class TextBanner extends React.Component<Prop, State> {
  public constructor(prop: Prop) {
    super(prop);
  }

  public render() {
    return <div className="text-banner">
            <div>{this.props.text}</div>
          </div>
  }
}
