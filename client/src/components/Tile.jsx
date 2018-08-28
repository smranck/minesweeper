import React from 'react';
import PropTypes from 'prop-types';

export default class Tile extends React.Component {
  getValue() {
    console.log('in GETVALUE');
    const { value } = this.props;

    if (!value.isRevealed) {
      return value.isFlagged ? 'F' : null;
    }
    if (value.isMine) {
      return 'B';
    }
    if (value.neighbor === 0) {
      return null;
    }
    return value.neighbor;
  }

  render() {
    const { onClick, cMenu, value } = this.props;
    let className = `tile${value.isRevealed ? '' : ' hidden'}${value.isMine ? ' is-mine' : ''}${
      value.isFlagged ? ' is-flag' : ''
    }`;
    return (
      <div className={className} onClick={onClick} onContextMenu={cMenu}>
        {this.getValue()}
      </div>
    );
  }
}

// function for default props
let alertErrs = () => {
  console.log('err in Tile.jsx props');
};
// seems right?
Tile.defaultProps = {
  onClick: alertErrs,
  cMenu: alertErrs,
};

Tile.propTypes = {
  onClick: PropTypes.func,
  cMenu: PropTypes.func,
};
