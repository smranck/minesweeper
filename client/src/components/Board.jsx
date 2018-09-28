import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile.jsx';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    let { height, width, mines, gameState } = this.props;
    let boardInfo = this.initBoardData(height, width, mines);
    this.state = {
      boardData: boardInfo,
    };
  }

  // this is the source of the number in the cell
  getNeighbors(board, height, width) {
    let updatedBoard = board.slice();
    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        if (board[i][j].isMine !== true) {
          let neighboringMines = 0;
          const neighboringTiles = this.traverseBoard(board[i][j].x, board[i][j].y, board);
          for (let tile = 0; tile < neighboringTiles.length; tile += 1) {
            if (neighboringTiles[tile].isMine) {
              neighboringMines += 1;
            }
          }
          if (neighboringMines === 0) {
            updatedBoard[i][j].isEmpty = true;
          }
          updatedBoard[i][j].neighbor = neighboringMines;
        }
      }
    }
    return updatedBoard;
  }

  // function to create an empty board
  createEmptyArray(height, width) {
    const emptyBoard = [];
    for (let i = 0; i < height; i += 1) {
      emptyBoard[i] = [];
      for (let j = 0; j < width; j += 1) {
        emptyBoard[i][j] = {
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
    return emptyBoard;
  }

  // function to add mines to an empty board
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

  // looks for neighboring cells and returns them
  traverseBoard(x, y, data) {
    const neighbors = [];
    let { height, width } = this.props;

    // up
    if (x > 0) {
      neighbors.push(data[x - 1][y]);
    }

    // down
    if (x < height - 1) {
      neighbors.push(data[x + 1][y]);
    }

    // left
    if (y > 0) {
      neighbors.push(data[x][y - 1]);
    }

    // right
    if (y < width - 1) {
      neighbors.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      neighbors.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < width - 1) {
      neighbors.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < height - 1 && y < width - 1) {
      neighbors.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x < height - 1 && y > 0) {
      neighbors.push(data[x + 1][y - 1]);
    }

    return neighbors;
  }

  initBoardData(height, width, mines) {
    let data = this.createEmptyArray(height, width);
    data = this.plantMines(data, height, width, mines);
    data = this.getNeighbors(data, height, width);
    let { changeGameState } = this.props;
    changeGameState(1);
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

  // want to change game status to in progress, win, or loss
  handleCellClick(x, y) {
    let { boardData } = this.state;
    let updatedBoard = boardData.slice();
    let gameLoss = false;
    // start the game
    let { changeGameState, gameState } = this.props;
    let gameStateAfterClick = gameState;
    // check whether it was already revealed or flagged
    if (updatedBoard[x][y].isRevealed || updatedBoard[x][y].isFlagged) {
      return;
    }
    // handle a bomb
    if (updatedBoard[x][y].isMine) {
      if (gameState === 1) {
        updatedBoard = this.preventLoss(x, y);
        gameStateAfterClick = 2;
      } else {
        this.handleLoss();
        gameLoss = true;
        gameStateAfterClick = 3;
      }
      // gameState 3 will offer a new game in rendered modal
      // that's what gameLoss will someday do
    }
    // handle an empty
    if (updatedBoard[x][y].neighbor === 0) {
      updatedBoard = this.revealEmpty(x, y, updatedBoard);
    } else {
      updatedBoard[x][y].isRevealed = true;
    }

    if (!updatedBoard[x][y].isMine && this.checkForWin()) {
      console.log('You WON!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      gameStateAfterClick = 4;
    }
    // in none of the above cases, still need to change gameState after click
    if (gameStateAfterClick === 1) {
      gameStateAfterClick += 1;
    }

    if (gameStateAfterClick !== gameState) {
      changeGameState(gameStateAfterClick);
    }
    this.setState({
      boardData: updatedBoard,
    });
  }

  // might someday handle overflagging
  handleContextMenu(x, y) {
    console.log('handling right click from Board.jsx');
    let { boardData } = this.state;
    let { mines } = this.props;
    let updatedBoard = boardData.slice();
    if (updatedBoard[x][y].isRevealed === false) {
      updatedBoard[x][y].isFlagged = !updatedBoard[x][y].isFlagged;
      updatedBoard[x][y].isFlagged ? (mines -= 1) : (mines += 1);
      let { changeMineCount } = this.props;
      changeMineCount(mines);
    }
  }

  // handles double clicks
  handleDoubleClick(x, y) {
    console.log('handling a double click mon!!!!!')
    let { boardData } = this.state;
    let updatedBoard = boardData.slice();

    // handle outside cases
    if (!updatedBoard[x][y].isRevealed || updatedBoard[x][y].isMine || updatedBoard[x][y].isFlagged || updatedBoard[x][y].neighbor === 0) {
      return;
    }

    // otherwise, we do things
    updatedBoard = this.revealNeighbors(x, y, updatedBoard);
    this.setState({
      boardData: updatedBoard,
    });
  }

  // Reveals neighbors of target tile if correct flags surrounding
  revealNeighbors(x, y, data) {
    let updatedData = data.slice();
    let neighbors = this.traverseBoard(x, y, updatedData);

    // count the number of adjacent mines
    let neighborFlags = 0;
    for (let i = 0; i < neighbors.length; i += 1) {
      let currentNeighbor = neighbors[i];
      if (currentNeighbor.isFlagged) {
        neighborFlags += 1;
      }
    }

    // do nothing if the number of surrounding flags is not what it should be
    if (neighborFlags !== updatedData[x][y].neighbor) {
      return updatedData;
    }

    let currentIndex = 0;
    let hitMine = false;

    // check each neighboring tile and handle as needed
    while (!hitMine && currentIndex < neighbors.length) {
      let currentNeighbor = neighbors[currentIndex];
      // if the neighbor is an unflagged mine, lose the game
      if (!currentNeighbor.isFlagged && currentNeighbor.isMine) {
        hitMine = true;
        this.handleLoss();
      } else if (!currentNeighbor.isFlagged) {
        // Only do these things if the neighbor is not flagged
        if (currentNeighbor.neighbor === 0) {
          updatedData = this.revealEmpty(currentNeighbor.x, currentNeighbor.y, updatedData);
        } else {
          updatedData[currentNeighbor.x][currentNeighbor.y].isRevealed = true;
        }
      }
      currentIndex += 1;
    }

    return updatedData;
  }

  // function to reveal whole board on game end
  revealBoard() {
    let { boardData } = this.state;
    let updatedBoard = boardData.slice();
    for (let i = 0; i < updatedBoard.length; i += 1) {
      for (let j = 0; j < updatedBoard[i].length; j += 1) {
        if (!updatedBoard[i][j].isFlagged) {
          updatedBoard[i][j].isRevealed = true;
        };
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

    return isWin;
  }

  // function to handle losses
  handleLoss() {
    this.revealBoard();
    let { changeGameState } = this.props;
    console.log('Big Loser baby');
    changeGameState(3);
  }

  // function to prevent loss on first click by reassigning that mine
  preventLoss(x, y) {
    console.log('LOSS PREVENTED *******************')
    let { boardData } = this.state;
    let { height, width } = this.props;
    let updatedBoard = boardData.slice();
    updatedBoard[x][y].isMine = false;
    let newMineMade = false;
    while (!newMineMade) {
      let row = Math.floor(Math.random() * width);
      let col = Math.floor(Math.random() * height);
      // handle case of reassign to same tile
      if (row !== x && col !== y && !updatedBoard[row][col].isMine) {
        updatedBoard[row][col].isMine = true;
        newMineMade = true;
      }
    }
    updatedBoard = this.getNeighbors(updatedBoard, height, width);
    return updatedBoard;
  }

  // last thing adds a clearfix div after the last cell of each row, or should. Needed?
  render() {
    const { boardData } = this.state;
    return (
      <div className="board">
        {boardData.map(datarow => datarow.map(dataitem => (
          <div key={dataitem.x * datarow.length + dataitem.y}>
            <Tile
              onClick={() => this.handleCellClick(dataitem.x, dataitem.y)}
              cMenu={() => this.handleContextMenu(dataitem.x, dataitem.y)}
              doubleClick={() => this.handleDoubleClick(dataitem.x, dataitem.y)}
              value={dataitem}
            />
            {datarow[datarow.length - 1] === dataitem ? <div className="clear" /> : ''}
          </div>
        )))}
      </div>
    );
  }
}
