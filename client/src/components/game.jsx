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
      gameMessage: 'Game in Progress',
      gameState: 1, // game state 1 is pregame, 2 is in game, 3 is game over
    };
  }

  incrementMines() {
    let { mines } = this.state;
    mines += 1;
    this.setState({
      mines,
    });
  }

  decrementMines() {
    let { mines } = this.state;
    mines -= 1;
    this.setState({
      mines,
    });
  }

  changeGameState(x) {
    // changecs gamestate and message
    let messages = {
      1: 'Game About to Begin',
      2: 'Game in Progress',
      3: 'Game Over',
    };
    this.setState({
      gameState: x,
      gameMessage: messages[x],
    });
  }

  render() {
    const {
      height, width, mines, gameMessage,
    } = this.state;
    const styles = {
      game: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
      },
    };
    return (
      <div className="game" style={styles.game}>
        <StatusBar gameMessage={gameMessage} mineCount={mines} />
        <Board height={height} width={width} mines={mines} />
      </div>
    );
  }
}
