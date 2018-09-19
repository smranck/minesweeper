import React from 'react';
// eslint-disable-next-line react/prefer-stateless-function
export default class StatusBar extends React.Component {
  render() {
    let { mineCount, gameMessage } = this.props;

    return (
      <div className="game-info">
        <span className="info">
          Mines:
          {mineCount}
        </span>
        <span className="info">{gameMessage}</span>
        <button className="new-game" type="button">
          New Game?
        </button>
      </div>
    );
  }
}
