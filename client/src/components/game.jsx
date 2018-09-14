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
    };
  }

  render() {
    const { height, width, mines } = this.state;
    const styles = {
      game: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
      },
    };
    return (
      <div className="game" style={styles.game}>
        <Board height={height} width={width} mines={mines} />
      </div>
    );
  }
}
