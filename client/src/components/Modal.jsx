import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class Modal extends React.Component {
  render() {
    const { gameState, newGame, toggleModal } = this.props;
    return (
      <div className="modal">
        {gameState === 4 ? 'You Won!' : 'You Lost!'}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            newGame();
          }}
        >
          New Game
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleModal();
          }}
        >
          Close
        </button>
      </div>
    );
  }
}
