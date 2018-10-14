import React from 'react';
import Board from './Board';
import StatusBar from './StatusBar';
import Modal from './Modal';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 8,
      width: 8,
      mines: 10,
      gameMessage: 'Game About to Begin',
      gameState: 1, // game state 1 is pregame, 2 is in game, 3 is game loss, 4 is game win
      gameNumber: 1,
      showModal: false,
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
      showModal: false,
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

  toggleModal() {
    let { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  }

  render() {
    const {
      height, width, mines, gameMessage, gameNumber, gameState, showModal,
    } = this.state;

    return (
      <div>
        <div className={`game${gameState === 3 ? ' loser' : gameState === 4 ? ' winner' : ''}`}>
          {showModal ? (
            <Modal
              gameState={gameState}
              newGame={() => this.startNewGame()}
              toggleModal={() => this.toggleModal()}
            />
          ) : (
            <StatusBar
              key={gameNumber * 2}
              gameMessage={gameMessage}
              mineCount={mines}
              newGame={() => this.startNewGame()}
            />
          )}
          <Board
            key={gameNumber}
            height={height}
            width={width}
            mines={mines}
            changeMineCount={m => this.changeMineCount(m)}
            changeGameState={x => this.changeGameState(x)}
            gameState={gameState}
            toggleModal={() => this.toggleModal()}
          />
        </div>
      </div>
    );
  }
}
