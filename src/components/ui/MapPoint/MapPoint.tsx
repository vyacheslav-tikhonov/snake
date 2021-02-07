import React from 'react';
import './MapPoint.scss';

interface Prop {
  className: 'food' | 'field' | 'snake'; 
}

interface State {
  //
}

export class MapPoint extends React.Component<Prop, State> {
  public constructor(props: Prop) {
    super(props);
  }

  public render() {
    return <div className={`${this.props.className} map-point`}></div>
  }
}