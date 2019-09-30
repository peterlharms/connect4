import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: 1,
      player2: 2,
      currentPlayer: null,
      board: [],
      gameOver: false,
      message: ''
    };

    // Bind play function to App component
    this.play = this.play.bind(this);
  }

  // Resetting Player Message
  resetPlayerMessage() {
    document.getElementById("YellowPlayersTurnDivId").style.display = "none";
    document.getElementById("RedPlayersTurnDivId").style.display = "block";
  }

  // Clearing Player Names
  clearPlayerNames() {
    document.getElementById("redname").value = "";
    document.getElementById("yellowname").value = "";
  }

  // Starts new game
  initBoard() {
    // Create a blank 6x7 matrix
    let board = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) { row.push(null) }
      board.push(row);
    }

    this.setState({
      board,
      currentPlayer: this.state.player1,
      gameOver: false,
      message: ''
    });
  }

  togglePlayer() {
    //this.state.currentPlayer is the player that just played
    if (this.state.currentPlayer === this.state.player1) {
      //It's Yellow Player's Turn
      document.getElementById("YellowPlayersTurnDivId").style.display = "block";
      document.getElementById("RedPlayersTurnDivId").style.display = "none";
    }
    else {
      //It's Red Player's Turn
      document.getElementById("YellowPlayersTurnDivId").style.display = "none";
      document.getElementById("RedPlayersTurnDivId").style.display = "block";
    }
    return (this.state.currentPlayer === this.state.player1) ? this.state.player2 : this.state.player1;
  }

  column_not_full(c){
    let board = this.state.board;
    debugger;
    for (var r=0;r<=5;r++){
      if (!board[r][c]) return true;
    }
    return false;
  }
  
  getRandom()
  {
    var available = [];
    for (var i=0;i<=6;i++) {
      if ( this.column_not_full(i)) {
        available.push(i);
      }
    }
    var index = Math.floor(Math.random() * available.length);
    return available[index];
  }

  play(c) {
    if (!this.state.gameOver) {
      // Place piece on board
      let board = this.state.board;
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = this.state.currentPlayer;
          break;
        }
      }
     
      c = this.getRandom();
      
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = this.state.player2;
          break;
        }
      }

      // Check status of board
      let result = this.checkAll(board);
      if (result === this.state.player1) {
        this.setState({ board, gameOver: true, message: 'Red Player:' + document.getElementById("redname").value + ' (red) wins!' });
      } else if (result === this.state.player2) {
        this.setState({ board, gameOver: true, message: 'Yellow Player:' + document.getElementById("yellowname").value + ' (yellow) wins!' });
      } else if (result === 'draw') {
        this.setState({ board, gameOver: true, message: 'Draw game.' });
      } else {
        // this.setState({ board, currentPlayer: this.togglePlayer() });
        this.setState({ board });
      }
    } else {
      this.setState({ message: 'Game over. Please start a new game.' });
    }
  }

  checkVertical(board) {
    // Check only if row is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c] &&
            board[r][c] === board[r - 2][c] &&
            board[r][c] === board[r - 3][c]) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkHorizontal(board) {
    // Check only if column is 3 or less
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r][c + 1] &&
            board[r][c] === board[r][c + 2] &&
            board[r][c] === board[r][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDiagonalRight(board) {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1] &&
            board[r][c] === board[r - 2][c + 2] &&
            board[r][c] === board[r - 3][c + 3]) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDiagonalLeft(board) {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1] &&
            board[r][c] === board[r - 2][c - 2] &&
            board[r][c] === board[r - 3][c - 3]) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDraw(board) {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return 'draw';
  }

  checkAll(board) {
    return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
  }

  componentWillMount() {
    this.initBoard();
  }

  render() {
    return (
      <div>
        <div className="button" onClick={() => { this.initBoard(); this.clearPlayerNames(); this.resetPlayerMessage(); }}>New Game</div>
        <div align="center">
          <label for="uname"><b>Red Player:</b></label>
          <input type="text" placeholder="Enter Red Player Name" id="redname"></input>
          <br />
          <label for="uname"><b>Yellow Player:</b></label>
          <input type="text" placeholder="Enter Yellow Player Name" id="yellowname"></input>
        </div>
        <div id="RedPlayersTurnDivId" align="center">
          It is <font color="#c40c0c"><b>Red</b></font> Player's Turn
        </div>
        <div id="YellowPlayersTurnDivId" align="center">
          It is <font color="yellow"><b>Yellow</b></font> Player's Turn
        </div>
        <table>
          <thead>
          </thead>
          <tbody>
            {this.state.board.map((row, i) => (<Row key={i} row={row} play={this.play} />))}
          </tbody>
        </table>

        <p className="message">{this.state.message}</p>
      </div>
    );
  }
}

// Row component
const Row = ({ row, play }) => {
  return (
    <tr>
      {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} play={play} />)}
    </tr>
  );
};

const Cell = ({ value, columnIndex, play }) => {
  let color = 'white';
  if (value === 1) {
    color = 'red';
  } else if (value === 2) {
    color = 'yellow';
  }

  return (
    <td>
      <div className="cell" onClick={() => { play(columnIndex) }}>
        <div className={color}></div>
      </div>
    </td>
  );
};


var mainDivElement = document.createElement("DIV");
mainDivElement.id = "main";

var footerDivElement = document.createElement("DIV");
footerDivElement.id = "footer";
footerDivElement.align = "center";
footerDivElement.innerText = "Powered by React, Docker, AWS";

document.body.appendChild(mainDivElement);
document.body.appendChild(footerDivElement);

var container = document.getElementById('main');

ReactDOM.render(<App />, container);

document.getElementById("YellowPlayersTurnDivId").style.display = "none";
