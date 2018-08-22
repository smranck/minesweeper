import React from 'react';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: this.initBoardData(this.props.height, thisprops.width, this.props.mines),
      gameStatus: false,
      mineCount: this.props.mines,
    };
  }

  // need the renderBoard, initBoardData functions

  // mines should be a string
  render() {
    return (
      <div className="board">
        <div className="game-info">
          <span className="info">
            mines:
            {this.state.mineCount}
          </span>
          <br />
          <span className="info">{this.state.gameStatus}</span>
        </div>
        {this.renderBoard(this.state.boardData)}
      </div>
    );
  }
}
