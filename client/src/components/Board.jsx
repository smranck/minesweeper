import React from 'react';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: this.initBoardData(this.props.height, this.props.width, this.props.mines),
      gameStatus: false,
      mineCount: this.props.mines,
    };
  }

  // need the renderBoard, initBoardData functions
  initBoard() {}

  createEmptyArray(height, width) {
    const data = [];
    for (let i = 0; i < height; i += 1) {
      data[i] = [];
      for (let j = 0; j < width; j += 1) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbor: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    return data;
  }

  plantMines(data, height, width, mines) {
    let x;
    let y;
    let minesPlanted = 0;

    while (minesPlanted < mines) {
      x = Math.floor(Math.random * width);
      y = Math.floor(Math.random * height);
    }
  }

  render() {
    let { mines, gameStatus, boardData } = this.state;
    return (
      <div className="board">
        <div className="game-info">
          <span className="info">
            mines:
            {mines}
          </span>
          <br />
          <span className="info">{gameStatus}</span>
        </div>
        {this.renderBoard(boardData)}
      </div>
    );
  }
}
