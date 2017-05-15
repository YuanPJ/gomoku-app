function Board(size) {
  this.currentColor = Board.BLACK;
  this.size = size;
  this.board = this.createBoard(size);
  this.allCombos = this.createCombo();
  this.win = false;
}

Board.EMPTY = 0;
Board.BLACK = 1;
Board.WHITE = -1;

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
  this.checkWin(i, j);
  this.switchPlayer();
  return true;
};


Board.prototype.createCombo = function createCombo() {
  const win = [
    [1, 1, 1, 1, 1],
  ];
  const unCovered4 = [
    [0, 1, 1, 1, 1, 0],
  ];
  const unCovered3 = [
    [0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 1, 0],
    [0, 1, 1, 0, 1, 0],
  ];
  const unCovered2 = [
    [0, 0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 0],
  ];
  const covered4 = [
    [-1, 1, 0, 1, 1, 1],
    [-1, 1, 1, 0, 1, 1],
    [-1, 1, 1, 1, 0, 1],
    [-1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, -1],
    [1, 0, 1, 1, 1, -1],
    [1, 1, 0, 1, 1, -1],
    [1, 1, 1, 0, 1, -1],
  ];
  const covered3 = [
    [-1, 1, 1, 1, 0, 0],
    [-1, 1, 1, 0, 1, 0],
    [-1, 1, 0, 1, 1, 0],
    [0, 0, 1, 1, 1, -1],
    [0, 1, 0, 1, 1, -1],
    [0, 1, 1, 0, 1, -1],
    [-1, 1, 0, 1, 0, 1, -1],
    [-1, 0, 1, 1, 1, 0, -1],
    [-1, 1, 1, 0, 0, 1, -1],
    [-1, 1, 0, 0, 1, 1, -1],
  ];
  const allCombos = [win, unCovered4, unCovered3, unCovered2, covered4, covered3];
  for (let k = 0; k < allCombos.length; k += 1) {
    const temp = [];
    for (let j = 0; j < allCombos[k].length; j += 1) {
      const tmp = [];
      for (let i = 0; i < allCombos[k][j].length; i += 1) {
        tmp[i] = -allCombos[k][j][i];
      }
      temp.push(tmp);
    }
    for (let m = 0; m < temp.length; m += 1) {
      allCombos[k].push(temp[m]);
    }
  }
  return allCombos;
};

Board.prototype.valueCombo = function valueCombo(w, u2, u3, u4, c3, c4) {
  if (w > 0) return 1000000000;
  if (u4 > 0) return 100000000;
  if (c4 > 1) return 10000000;
  if (u3 > 0 && c4 > 0) return 1000000;
  if (u3 > 1) return 100000;

  if (u3 === 1) {
    if (u2 === 3) return 40000;
    if (u2 === 2) return 38000;
    if (u2 === 1) return 35000;
    return 3450;
  }

  if (c4 === 1) {
    if (u2 === 3) return 4500;
    if (u2 === 2) return 4200;
    if (u2 === 1) return 4100;
    return 4050;
  }

  if (c3 === 1) {
    if (u2 === 3) return 3400;
    if (u2 === 2) return 3300;
    if (u2 === 1) return 3100;
  }

  if (c3 === 2) {
    if (u2 === 2) return 3000;
    if (u2 === 1) return 2900;
  }

  if (c3 === 3) {
    if (u2 === 1) return 2800;
  }

  if (u2 === 4) return 2700;
  if (u2 === 3) return 2500;
  if (u2 === 2) return 2000;
  if (u2 === 1) return 1000;
  return 0;
};

Board.prototype.findArray = function findArray(arr, inArr) {
  const fCount = arr.length;
  const sCount = inArr.length;
  let k;
  for (let i = 0; i <= fCount - sCount; i += 1) {
    k = 0;
    for (let j = 0; j < sCount; j += 1) {
      if (arr[i + j] === inArr[j]) k += 1;
      else break;
    }
    if (k === sCount) return true;
  }
  return false;
};

Board.prototype.isAnyInArrays = function isAnyInArrays(combos, arr) {
  for (let i = 0; i < combos.length; i += 1) {
    if (this.findArray(arr, combos[i])) return true;
  }
  return false;
};

Board.prototype.checkWin = function checkWin(i, j) {
  const winValue = 1000000000;
  // for (let i = 0; i < this.size; i += 1) {
  //   for (let j = 0; j < this.size; j += 1) {
      if (this.board[i][j] !== Board.EMPTY) {
        const playerVal = this.valuePosition(
          this.getCombo(this.board, this.board[i][j], i, j, 1, 0),
          this.getCombo(this.board, this.board[i][j], i, j, 0, 1),
          this.getCombo(this.board, this.board[i][j], i, j, 1, 1),
          this.getCombo(this.board, this.board[i][j], i, j, 1, -1),
        );
        if (playerVal === winValue) {
          this.win = true;
          console.log('finish');
        }
      }
  //   }
  // }
};

Board.prototype.valuePosition = function valuePosition(arr1, arr2, arr3, arr4) { // 4 directions
  let w = 0;
  let u2 = 0;
  let u3 = 0;
  let u4 = 0;
  let c3 = 0;
  let c4 = 0;
  const allArr = [arr1, arr2, arr3, arr4];
  for (let i = 0; i < allArr.length; i += 1) {
    if (this.isAnyInArrays(this.allCombos[0], allArr[i])) {
      w += 1;
    } else if (this.isAnyInArrays(this.allCombos[4], allArr[i])) {
      c4 += 1;
    } else if (this.isAnyInArrays(this.allCombos[5], allArr[i])) {
      c3 += 1;
    } else if (this.isAnyInArrays(this.allCombos[1], allArr[i])) {
      u4 += 1;
    } else if (this.isAnyInArrays(this.allCombos[2], allArr[i])) {
      u3 += 1;
    } else if (this.isAnyInArrays(this.allCombos[3], allArr[i])) {
      u2 += 1;
    }
  }
  return this.valueCombo(w, u2, u3, u4, c3, c4);
};

Board.prototype.getCombo = function getCombo(node, curPlayer, i, j, dx, dy) {
  const combo = [curPlayer];
  for (let m = 1; m < 5; m += 1) {
    const nextX1 = i - (dx * m);
    const nextY1 = j - (dy * m);
    if (nextX1 >= this.size || nextY1 >= this.size || nextX1 < 0 || nextY1 < 0) break;
    const next1 = node[nextX1][nextY1];
    if (node[nextX1][nextY1] === -curPlayer) {
      combo.unshift(next1);
      break;
    }
    combo.unshift(next1);
  }
  for (let k = 1; k < 5; k += 1) {
    const nextX = i + (dx * k);
    const nextY = j + (dy * k);
    if (nextX >= this.size || nextY >= this.size || nextX < 0 || nextY < 0) break;
    const next = node[nextX][nextY];
    if (next === -curPlayer) {
      combo.push(next);
      break;
    }
    combo.push(next);
  }
  return combo;
};

export default Board;
