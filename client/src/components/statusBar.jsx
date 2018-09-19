import React from 'react';
// eslint-disable-next-line react/prefer-stateless-function
export default class StatusBar extends React.Component {
  render() {
    let { mineCount, gameMessage, newGame } = this.props;

    return (
      <div className="game-info">
        <span className="info">
          Mines:
          {mineCount}
        </span>
        <span className="info">{gameMessage}</span>
        <button className="new-game" type="button" onClick={() => newGame()}>
          New Game?
        </button>
      </div>
    );
  }
}
