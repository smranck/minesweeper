import React from 'react';
import Tile from './Tile.jsx';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    let { height, width, mines } = this.props;
    let boardInfo = this.initBoardData(height, width, mines);
    this.state = {
      boardData: boardInfo,
      gameStatus: false,
      // mineCount: mines,
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

    return data;
  }

  handleCellClick(x, y) {
    console.log('handling Cell click from Board.jsx');
    let { boardData } = this.state;
    let updatedBoard = boardData.slice();
    updatedBoard[x][y].isRevealed = true;
    this.setState({
      boardData: updatedBoard,
    });
  }

  handleContextMenu(x, y) {
    console.log('handling right click from Board.jsx');
  }

  // last thing adds a clearfix div after the last cell of each row, or should
  // there's no way this should be here

  renderBoard(data) {
    return data.map(datarow => datarow.map((dataitem) => {
      console.log('mapping off dataitem');
      return (
        <div key={dataitem.x * datarow.length + dataitem.y}>
          <Tile
            onClick={() => this.handleCellClick(dataitem.x, dataitem.y)}
            cMenu={e => this.handleContextMenu(e, dataitem.x, dataitem.y)}
            value={dataitem}
          />
          {datarow[datarow.length - 1] === dataitem ? <div className="clear" /> : ''}
        </div>
      );
    }));
  }

  render() {
    const { gameStatus, boardData } = this.state;
    let { mines } = this.props;
    console.log('MIIIINES BOYZ', this);
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
            {mines}
          </span>
          <br />
          <span className="info">{gameStatus}</span>
        </div>
        {console.log(boardData, 'Returning in Board render')}
        {this.renderBoard(boardData)}
      </div>
    );
  }

  // original
  // render() {
  //   let { mines, gameStatus, boardData } = this.state;
  //   return (
  //     <div className="board">
  //       <div className="game-info">
  //         <span className="info">
  //           mines:
  //           {mines}
  //         </span>
  //         <br />
  //         <span className="info">{gameStatus}</span>
  //       </div>
  //       {this.renderBoard(boardData)}
  //     </div>
  //   );
  // }
  // render() {
  //   return <div>Board says Hello!</div>;
  // }
}
