import React, { Component } from 'react';
import Board from './Board';

const GRID_SIZE = 40;

class BoardIntersection extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onPlay(this.props.row, this.props.col);
  }
  render() {
    const style = {
      top: this.props.row * GRID_SIZE,
      left: this.props.col * GRID_SIZE,
    };

    let classes = 'intersection';
    if (this.props.color !== Board.EMPTY) {
      classes += this.props.color === Board.BLACK ? ' black' : ' white';
    }

    return (
      <radio
        onClick={this.handleClick}
        className={classes}
        style={style}
      />
    );
  }
}

class BoardView extends Component {
  render() {
    const intersections = [];
    for (let i = 0; i < this.props.board.size; i++) {
      for (let j = 0; j < this.props.board.size; j++) {
        intersections.push({
          color: this.props.board.board[i][j],
          row: j,
          col: i,
        });
      }
    }
    const style = {
      width: this.props.board.size * GRID_SIZE,
      height: this.props.board.size * GRID_SIZE,
    };
    return (
      <div style={style} id="board">
        {intersections.map(i =>
          <BoardIntersection
            key={`${i.col}-${i.row}`}
            col={i.col}
            row={i.row}
            color={i.color}
            onPlay={(row, col) => this.props.onPlay(row, col)}
          />,
        )}
      </div>
    );
  }
}

export default BoardView;
