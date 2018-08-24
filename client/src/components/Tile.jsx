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
