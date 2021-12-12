
const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])



function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array, added NULL to push()
  for(let y = 0; y < HEIGHT; y++) {
    const newArr = []
    board.push(newArr);
    for(let x=0; x < WIDTH; x++){
      newArr.push(null)
    }
  }
}


function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
const htmlBoard = document.getElementById("board")
  // TODO: add comment for this code
  //creates a top row and sets the ID to topRow
  let top = document.createElement("tr");
  top.setAttribute("id", "topRow");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // creates a table row on both x & y axis, sets ID as well 
  // and appends the newly created cell to the row
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT -1; y >= 0; y--){
    if(board[y][x] === null) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  
  const spot = document.getElementById(`${y}-${x}`);
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`)
  spot.append(piece);
}


/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert('Game Over!')
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;


  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);
  // check for win
  if (checkForWin()) {
    return endGame (`Player $(currPlayer) won!`)
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
    currPlayer = currPlayer === 1 ? 2 : 1
  
  // TODO: switch currPlayer 1 <-> 2

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
