import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class Modal extends React.Component {
  render() {
    const { gameState, newGame } = this.props;
    return gameState === 3 ? <div>You Lost!</div> : <div> You Won!</div>;
  }
}
