import React from 'react';
import Board from './Board.jsx';
import StatusBar from './StatusBar.jsx';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 8,
      width: 8,
      mines: 10,
      gameMessage: 'Game About to Begin',
      gameState: 1, // game state 1 is pregame, 2 is in game, 3 is game less, 4 is game win
      gameNumber: 1,
    };
  }

  startNewGame() {
    let { gameNumber } = this.state;
    gameNumber += 1;
    this.setState({
      height: 8,
      width: 8,
      mines: 10,
      gameMessage: 'Game About to Begin',
      gameState: 1,
      gameNumber,
    });
  }

  changeMineCount(mines) {
    // Increments mines
    this.setState({
      mines,
    });
  }

  changeGameState(x) {
    // change gamestate and message
    let messages = {
      1: 'Game About to Begin',
      2: 'Game in Progress',
      3: 'Game Over',
      4: 'You Win!!!',
    };
    this.setState({
      gameState: x,
      gameMessage: messages[x],
    });
  }

  render() {
    const {
      height, width, mines, gameMessage, gameNumber, gameState,
    } = this.state;

    return (
      <div className="game">
        <StatusBar
          key={gameNumber * 2}
          gameMessage={gameMessage}
          mineCount={mines}
          newGame={() => this.startNewGame()}
        />
        <Board
          key={gameNumber}
          height={height}
          width={width}
          mines={mines}
          changeMineCount={m => this.changeMineCount(m)}
          changeGameState={x => this.changeGameState(x)}
          gameState={gameState}
        />
      </div>
    );
  }
}
