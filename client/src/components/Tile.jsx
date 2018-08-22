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
    const { value, onClick, cMenu } = this.props;
    return (
      <div onClick={this.props.onClick} onContextMenu={this.props.cMenu}>
        {this.getValue()}
      </div>
    );
  }
}

//Typechecking with PropTypes. Not Super needed as of now.
const tileItemShape = {
  isRevealed: PropTypes.bool,
  isMine: PropTypes.bool,
  isFlagged: PropTypes.bool,
};

Tile.propTypes = {
  value: PropTypes.objectOf(PropTypes.shape(tileItemShape)),
  onClick: PropTypes.func,
  cMenu: PropTypes.func,
};
