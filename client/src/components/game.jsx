import React from 'react';
import Board from './Board.jsx';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    state = {
      height: 8,
      width: 8,
      mines: 10,
    };
  }

  render() {
    const { height, width, mines } = this.state;
    return (
      <div className="game">
        <Board height={height} width={width} mines={mines} />
      </div>
    );
  }
}
