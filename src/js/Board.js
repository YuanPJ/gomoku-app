function Board(size) {
  this.currentColor = Board.BLACK;
  this.size = size;
  this.board = this.createBoard(size);
}

Board.EMPTY = 0;
Board.BLACK = 1;
Board.WHITE = 2;

/*
 * Returns a size x size matrix with all entries initialized to Board.EMPTY
 */
Board.prototype.createBoard = function createBoard(size) {
  const m = [];
  for (let i = 0; i < size; i += 1) {
    m[i] = [];
    for (let j = 0; j < size; j += 1) {
      m[i][j] = Board.EMPTY;
    }
  }
  console.log('Generate new board.');
  return m;
};

/*
 * Switches the current player
 */
Board.prototype.switchPlayer = function switchPlayer() {
  this.currentColor =
        this.currentColor === Board.BLACK ? Board.WHITE : Board.BLACK;
};

/*
 * Called when the game ends (both players passed)
 */
Board.prototype.endGame = function endGame() {
  console.log('GAME OVER');
};

/*
 * Attempt to place a stone at (i,j). Returns true iff the move was legal
 */
Board.prototype.play = function play(i, j) {
  console.log(`Played at ${i}, ${j}.`);
  if (this.board[i][j] !== Board.EMPTY) {
    return false;
  }
  this.board[i][j] = this.currentColor;
  this.switchPlayer();
  return true;
};

export default Board;
