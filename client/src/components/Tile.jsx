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
    const styles = {
      tile: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        background: '#7b7b7b',
        border: '1px solid #fff',
        float: 'left',
        lineHeight: '45px',
        height: '45px',
        textAlign: 'center',
        width: '45px',
        cursor: 'pointer',
        borderRadius: '5px',
        color: '#fff',
        fontWeight: '600',
      },
    };
    let className = `tile${value.isRevealed ? '' : ' hidden'}${value.isMine ? ' is-mine' : ''}${
      value.isFlagged ? ' is-flag' : ''
    }`;
    return (
      <div style={styles.tile} className={className} onClick={onClick} onContextMenu={cMenu}>
        {this.getValue()}
        Hello From Tile
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
  value: alertErrs(),
};

Tile.propTypes = {
  onClick: PropTypes.func,
  cMenu: PropTypes.func,
  value: PropTypes.shape({
    isEmpty: PropTypes.bool,
    isFlagged: PropTypes.bool,
    isMine: PropTypes.bool,
    isRevealed: PropTypes.bool,
    neighbor: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};
