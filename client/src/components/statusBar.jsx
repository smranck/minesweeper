import React from 'react';
// eslint-disable-next-line react/prefer-stateless-function
export default class Board extends React.Component {
  render() {
    let { mineCount, gameMessage } = this.props;

    return (
      <div className="game-info">
        <span className="info">
          Mines:
          {mineCount}
        </span>
        <br />
        <span className="info">{gameMessage}</span>
      </div>
    );
  }
}
