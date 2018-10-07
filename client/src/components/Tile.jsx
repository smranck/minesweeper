import React from 'react';
import PropTypes from 'prop-types';

export default class Tile extends React.Component {
  static getDisplayValue(tile) {
    if (!tile.isRevealed) {
      return tile.isFlagged ? 'F' : null;
    }
    if (tile.isMine) {
      return 'B';
    }
    if (tile.neighbor === 0) {
      return null;
    }
    return tile.neighbor;
  }

  // seems to have access to this.props so let's do that
  handleClick(e) {
    e.preventDefault();
    let { tileData, onClick } = this.props;
    onClick(tileData.x, tileData.y);
  }

  handleContextMenu(e) {
    e.preventDefault();
    let { tileData, cMenu } = this.props;
    cMenu(tileData.x, tileData.y);
  }

  handleDoubleClick(e) {
    e.preventDefault();
    let { tileData, doubleClick } = this.props;
    doubleClick(tileData.x, tileData.y);
  }

  render() {
    const { tileData } = this.props;

    let className = `tile${tileData.isRevealed ? ' revealed' : ' hidden'}${
      tileData.isMine ? ' is-mine' : ''
    }${tileData.isFlagged ? ' is-flag' : ''}${tileData.wasClicked ? ' clicked' : ''}`;
    return (
      <div
        className={className}
        onClick={e => this.handleClick(e)}
        onContextMenu={e => this.handleContextMenu(e)}
        onDoubleClick={e => this.handleDoubleClick(e)}
      >
        {Tile.getDisplayValue(tileData)}
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
  tileData: alertErrs,
};

Tile.propTypes = {
  onClick: PropTypes.func,
  cMenu: PropTypes.func,
  tileData: PropTypes.shape({
    isEmpty: PropTypes.bool,
    isFlagged: PropTypes.bool,
    isMine: PropTypes.bool,
    isRevealed: PropTypes.bool,
    neighbor: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};
