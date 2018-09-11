import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile.jsx';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    let { height, width, mines } = this.props;
    let boardInfo = this.initBoardData(height, width, mines);
    this.state = {
      boardData: boardInfo,
      gameMessage: 'Game In Progress',
      mineCount: mines,
      gameState: 1, // game state 1 is pregame, 2 is in game, 3 is game over
    };
  }

  // need the renderBoard, initBoardData functions

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

  // not returning anthing!
  plantMines(data, height, width, mines) {
    let x;
    let y;
    let minesPlanted = 0;
    let updatedData = data;

    while (minesPlanted < mines) {
      x = Math.floor(Math.random() * width);
      y = Math.floor(Math.random() * height);
      if (!updatedData[x][y].isMine) {
        updatedData[x][y].isMine = true;
        minesPlanted += 1;
      }
    }

    return updatedData;
  }

  // function to look at a cell's neighbors to see if they are mines and remembers it
  getNeighbors(data, height, width) {
    let updatedData = data;
    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
          // console.log('******************GETNEIGHBORS', area);
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
  traverseBoard(x, y, data) {
    const el = [];
    let { height, width } = this.props;

    // up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }

    // down
    if (x < height - 1) {
      el.push(data[x + 1][y]);
    }

    // left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }

    // right
    if (y < width - 1) {
      el.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < width - 1) {
      el.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < height - 1 && y < width - 1) {
      el.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x < height - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }

    return el;
  }

  initBoardData(height, width, mines) {
    let data = this.createEmptyArray(height, width);
    data = this.plantMines(data, height, width, mines);
    data = this.getNeighbors(data, height, width);
    this.setState({
      gameState: 2,
    })
    return data;
  }

  // function to reveal all adjacent when an empty is pressed
  revealEmpty(x, y, boardData) {
    let board = boardData;
    // if revealed already, don't do anything
    // base case
    if (board[x][y].isRevealed) {
      return board;
    }
    // reveal that tile
    board[x][y].isRevealed = true;
    // if that tile is empty (we know first but for the rest) then recur
    if (board[x][y].neighbor === 0) {
      let adjacents = this.traverseBoard(x, y, board);
      for (let i = 0; i < adjacents.length; i += 1) {
        board = this.revealEmpty(adjacents[i].x, adjacents[i].y, board);
      }
    }
    return board;
  }

  /*
  right now it only reveals. Now need to do something
    if bomb:
      assert loss and offer new game
  */
  handleCellClick(x, y) {
    console.log('handling Cell click from Board.jsx');
    let { boardData } = this.state;
    let updatedBoard = boardData.slice();
    console.log(updatedBoard[x][y]);
    // check whether it was already revealed or flagged
    if (updatedBoard[x][y].isRevealed || updatedBoard[x][y].isFlagged) {
      return;
    }
    // handle a bomb
    if (updatedBoard[x][y].isMine) {
      this.handleLoss();
      // will want to offer another game in a modal probably
    }
    // handle an empty
    if (updatedBoard[x][y].neighbor === 0) {
      updatedBoard = this.revealEmpty(x, y, updatedBoard);
    } else {
      updatedBoard[x][y].isRevealed = true;
    }

    if (!updatedBoard[x][y].isMine && this.checkForWin()) {
      console.log("You WON!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }

    this.setState({
      boardData: updatedBoard,
    });
  }

  // might someday handle overflagging
  handleContextMenu(x, y) {
    console.log('handling right click from Board.jsx');
    let { boardData, mineCount } = this.state;
    let updatedBoard = boardData.slice();
    updatedBoard[x][y].isFlagged = !updatedBoard[x][y].isFlagged;
    updatedBoard[x][y].isFlagged ? (mineCount -= 1) : (mineCount += 1);
    this.setState({
      boardData: updatedBoard,
      mineCount,
    });
  }

  // this should check if the number of flags is the same as the neighbors value
  // if so, reveal all neighbors that aren't flagged
  // if any bombs are revealed, it's a loss
  // then set state
  handleDoubleClick(x, y) {
    console.log('handling a double click mon!!!!!')
  }

  // function to reveal whole board on game end
  revealBoard() {
    let { boardData } = this.state;
    let updatedBoard = boardData.slice();
    for (let i = 0; i < updatedBoard.length; i += 1) {
      for (let j = 0; j < updatedBoard[i].length; j += 1) {
        updatedBoard[i][j].isRevealed = true;
      }
    }
    this.setState({
      boardData: updatedBoard,
    });
  }

  // function to check whether a board has been won. Returns a boolean.
  checkForWin() {
    let { boardData } = this.state;
    // iterate through board to see if it's a winning board
    let isWin = true;
    for (let i = 0; i < boardData.length; i += 1) {
      let tileCount = 0;
      while (isWin && tileCount < boardData[i].length) {
        // if any tile is not a mine and is not revealed, no win
        if (!boardData[i][tileCount].isMine && !boardData[i][tileCount].isRevealed) {
          isWin = false;
        }
        tileCount += 1;
      }
    }
    if (isWin) {
      this.setState({
        gameMessage: 'YOU WON!!!!!!!!!',
      })
    }
    return isWin;
  }

  // function to handle losses
  handleLoss() {
    this.revealBoard();
    console.log('Big Loser baby');
    this.setState({
      gameState: 3,
      gameMessage: 'YOU LOST!!!!!!!!!!',
    });
  }

  // last thing adds a clearfix div after the last cell of each row, or should
  // there's no way this should be here
  renderBoard(data) {
    return data.map(datarow => datarow.map(dataitem => (
      <div key={dataitem.x * datarow.length + dataitem.y}>
        <Tile
          onClick={() => this.handleCellClick(dataitem.x, dataitem.y)}
          cMenu={() => this.handleContextMenu(dataitem.x, dataitem.y)}
          doubleClick={() => this.handleDoubleClick(dataitem.x, dataitem.y)}
          value={dataitem}
        />
        {datarow[datarow.length - 1] === dataitem ? <div className="clear" /> : ''}
      </div>
    )));
  }

  render() {
    const { gameMessage, boardData, mineCount } = this.state;
    const styles = {
      gameInfo: {
        marginBottom: '20px',
        background: '#19a0d9',
        padding: '7px',
        textAlign: 'center',
        color: '#fff',
        minHeight: '100px',
        borderRadius: '7px',
        info: {
          display: 'block',
          marginTop: '15px',
        },
      },
    };
    return (
      <div className="board">
        <div className="game-info" style={styles.gameInfo}>
          <span className="info" style={styles.gameInfo.info}>
            Mines:
            {mineCount}
          </span>
          <br />
          <span className="info">{gameMessage}</span>
        </div>
        {console.log(boardData, 'Returning in Board render')}
        {this.renderBoard(boardData)}
      </div>
    );
  }

  // original
  // render() {
  //   let { mines, gameMessage, boardData } = this.state;
  //   return (
  //     <div className="board">
  //       <div className="game-info">
  //         <span className="info">
  //           mines:
  //           {mines}
  //         </span>
  //         <br />
  //         <span className="info">{gameMessage}</span>
  //       </div>
  //       {this.renderBoard(boardData)}
  //     </div>
  //   );
  // }
  // render() {
  //   return <div>Board says Hello!</div>;
  // }
}
