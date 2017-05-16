import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FileSaver from 'file-saver';
import Board from './Board';
import BoardView from './BoardView';
import HistoryView from './HistoryView';
import '../css/style.css';

const styles = {
  button: {
    verticalAlign: 'middle',
    margin: '10px',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

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
    this.handleLoadJson = this.handleLoadJson.bind(this);
  }

  componentDidMoint() {
    const input = document.getElementById('input');
    input.addEventListener('change', this.handleLoadJson, false);
  }

  handleClickIntersection(col, row) {
    const board = this.state.board;
    if (board.play(row, col)) {
      const savedBoard = new Board(15, board.currentColor, board.board, board.win);
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
    const board = new Board(15, savedBoard.currentColor, savedBoard.board, savedBoard.win);
    console.log(`click history ${step}`);
    this.setState({
      board,
      stepNumber: step,
    });
  }

  handleLoadJson() {
    const fileReader = new FileReader();
    const file = document.getElementById('input').files[0];
    fileReader.addEventListener('loadend', () => {
      // const json = fileReader.result;
      const json = JSON.parse(fileReader.result);
      const history = [];
      for (let i = 0; i < 255; i += 1) {
        if (json[i.toString()] !== undefined) {
          history.push(json[i.toString()]);
          console.log(json[i.toString()]);
        } else {
          break;
        }
      }
      const savedBoard = history[history.length - 1].savedBoard;
      const board = new Board(15, savedBoard.currentColor, savedBoard.board, savedBoard.win);
      console.log(savedBoard.board);
      console.log(board);
      this.setState({
        board,
        history,
        stepNumber: history.length,
      });
    });
    fileReader.readAsText(file);
  }

  render() {
    const history = this.state.history;
    const json = {};
    for (let i = 0; i < history.length; i += 1) {
      json[i.toString()] = history[i];
    }
    const blob = new Blob([JSON.stringify(json)], { type: 'text/plain;charset=utf-8' });
    return (
      <div className="gomoku-game">
        <BoardView
          board={this.state.board}
          onPlay={(col, row) => this.handleClickIntersection(col, row)}
        />
        <div className="chess">
          <RaisedButton
            label="Load"
            style={styles.button}
            containerElement="label"
          >
            <input
              id="input"
              type="file"
              style={styles.uploadInput}
              onChange={this.handleLoadJson}
            />
          </RaisedButton>
          <RaisedButton
            label="Save"
            style={styles.button}
            primary
            onTouchTap={() => {
              FileSaver.saveAs(blob, 'chess.txt');
            }}
          />
          <HistoryView
            history={this.state.history}
            onClick={step => this.handleClickHistory(step)}
          />
        </div>
      </div>
    );
  }
}

export default GomokuApp;
