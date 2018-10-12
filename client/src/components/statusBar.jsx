import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/prefer-stateless-function
export default class StatusBar extends React.Component {
  render() {
    let { mineCount, gameMessage, newGame } = this.props;

    return (
      <div className="game-info">
        <span className="info">
          Mines:
          {mineCount}
        </span>
        <span className="info">{gameMessage}</span>
        <span className="info">
          <button className="new-game button" type="button" onClick={() => newGame()}>
            New Game?
          </button>
        </span>
      </div>
    );
  }
}

// function for func props to use as default
let alertErrs = () => {
  console.log('err in StatusBar.jsx props');
};

// default props in case of error
StatusBar.defaultProps = {
  mineCount: 10,
  gameMessage: 'Error getting gameMessage in StatusBar',
  newGame: alertErrs,
};

// actual assertion of prop types
StatusBar.propTypes = {
  mineCount: PropTypes.number,
  gameMessage: PropTypes.string,
  newGame: PropTypes.func,
};
