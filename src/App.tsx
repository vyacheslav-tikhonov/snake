import React from 'react';
import './App.scss';
import Game from './components/Game/Game';

export class App extends React.Component {
  public render() {
    return <div className="App">
      <Game />
    </div>
  }
}

export default App;
