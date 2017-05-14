import React, { Component } from 'react';
import Board from './Board';
import BoardView from './BoardView';
import '../css/style.css';

class GomokuApp extends Component {
  constructor() {
    super();
    const board = new Board(15);
    this.state = {
      board,
    };
    this.handleClickIntersection = this.handleClickIntersection.bind(this);
  }

  handleClickIntersection(col, row) {
    if (this.state.board.play(row, col)) {
      this.setState({
        board: this.state.board,
      });
    }
  }

  render() {
    return (
      <div>
        <BoardView
          board={this.state.board}
          onPlay={(row, col) => this.handleClickIntersection(row, col)}
        />
      </div>
    );
  }
}

export default GomokuApp;
