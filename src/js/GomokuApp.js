import React, { Component } from 'react';
import Board from './Board';
import BoardView from './BoardView';
import HistoryView from './HistoryView';
import '../css/style.css';

class GomokuApp extends Component {
  constructor() {
    super();
    const board = new Board(15);
    this.state = {
      board,
      history: [{
        savedBoard: new Board(15),
        text: 'Game Start',
      }],
      stepNumber: 0,
    };
    this.handleClickIntersection = this.handleClickIntersection.bind(this);
    this.handleClickHistory = this.handleClickHistory.bind(this);
  }

  handleClickIntersection(col, row) {
    const board = this.state.board;
    if (board.play(row, col)) {
      const savedBoard = new Board(15, board.currentColor, board.board);
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      let text = '';
      if (board.currentColor !== Board.BLACK) {
        text = `BLACK ${row} ${col}`;
      } else {
        text = `WHITE ${row} ${col}`;
      }
      if (board.win) {
        text = `Win: ${text}`;
      }
      console.log(`history ${text}`);
      this.setState({
        board,
        history: history.concat([{
          savedBoard,
          text,
        }]),
        stepNumber: history.length,
      });
    }
  }

  handleClickHistory(step) {
    const savedBoard = this.state.history[step].savedBoard;
    const board = new Board(15, savedBoard.currentColor, savedBoard.board);
    console.log(`click history ${step}`);
    this.setState({
      board,
      stepNumber: step,
    });
  }

  render() {
    return (
      <div className="gomoku-game">
        <BoardView
          board={this.state.board}
          onPlay={(col, row) => this.handleClickIntersection(col, row)}
        />
        <HistoryView
          history={this.state.history}
          onClick={step => this.handleClickHistory(step)}
        />
      </div>
    );
  }
}

export default GomokuApp;
