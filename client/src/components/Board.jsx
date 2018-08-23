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
      if (!data[x][y].isMine) {
        data[x][y].isMine = true;
        minesPlanted += 1;
      }
    }
  }

  // function to look at a cell's neighbors to see if they are mines and remembers it
  getNeighbors(data, height, width) {
    let updatedData = data;
    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
          area.map((value) => {
            if (value.isMine) {
              mine += 1;
            }
          });
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          updatedData[i][j].neighbor = mine;
        }
      }
    }
    return updatedData;
  }

  // looks for neighboring cells and returns them

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
