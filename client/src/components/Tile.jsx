import React from 'react';
import PropTypes from 'prop-types';

export default class Tile extends React.Component {
  getValue() {
    const { value } = this.props;

    if (!value.isRevealed) {
      return this.props.value.isFlagged ? 'F' : null;
    }
    if (value.isMine) {
      return 'B';
    }
    if (value.neighbor === 0) {
      return null;
    }
    return value.neightbor;
  }

  render() {
    const { onClick, cMenu } = this.props;
    return (
      <div onClick={onClick} onContextMenu={cMenu}>
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
