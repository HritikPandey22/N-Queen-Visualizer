import React, { Component } from "react";
import Cells from "./cells";
// import Navbar from "./navbar";
import Controller from "../Controller/controller";
import './style.css'
import logo from './logo.png';

class Queen extends Component {
  state = {
    board: [],
    size: 4,
    speed: 490,
    isRunning: false,
  };

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const board = createBoard(this.state.size);
    this.setState({ board });
  }

  render() {
    return (
      <div>

        {/* ------ Heading of page------ */}
        <div className="nav">
          <img className="logo" src={logo} alt="logo" />
          <label className="mainHeading">N Queen Visualizer</label>
        </div>

        <div className="container">
        {/* ------------------Controller------------------ */}
        <Controller
          sizeChanger={(event) => {
            this.handleQueenChange(event.target.value);
          }}
          speedChanger={(event) => {
            this.handleSpeedChange(event.target.value);
          }}
        />

        {/* ----------------Buttons---------------------- */}
        <div className="buttonContainer">
          <button className="btn" onClick={this.handleClear}>
            Clear Board
          </button>
          <button className="btn" onClick={this.startAlgo}>
            Visualize
          </button>
          </div>
          
          </div>

        {/* -------------------BOARD-------------------- */}
        <div className="grid">
          <Cells board={this.state.board} />
        </div>
      </div>
    );
  }

  handleStop = () => {
    this.setState({ isRunning: false });
  };

  handleSpeedChange = (val) => {
    const speed = (100 - val) * 10;
    this.setState({ speed });
  };

  handleQueenChange = (size) => {
    this.setState({ size });
    const newBoard = createBoard(size);
    this.setState({ board:newBoard });
  };

  handleClear = () => {
    const board = createBoard(this.state.size);
    this.setState({ board });
  };

  startAlgo = async () => {
    console.log("visualizing");
    this.setState({ isRunning: true });
    const newBoard = this.state.board.slice();
    await this.queensAlgo(newBoard, 0);
    const newBoard2 = turnOffAttack(this.state.board, this.state.number);
    this.setState({ board: newBoard2, isRunning: false });
  };

  queensAlgo = async (board, col) => {
    //main function for finding a solution

    //base condition of recursion
    if (col >= this.state.size) return true;

    let newBoard = board.slice();

    //moving through all the rows in the column 'col'
    for (let i = 0; i < this.state.size; i++) {
      newBoard = turnOffAttack(newBoard, this.state.size); //for making the board normal

      const result = getChecked(newBoard, i, col, this.state.size);
      //result is like [a,b], where a is returned newBoard and b denotes whether queen can be placed on the position [i,col]

      newBoard = result[0];
      const isValid = result[1];

      this.setState({ board: newBoard });
      await sleep(this.state.speed);

      if (isValid) {
        //queen can be placed on [i,col]
        const res = await this.queensAlgo(newBoard, col + 1);

        if (res === true) return true;

        newBoard[i][col] = {
          ...newBoard[i][col],
          isPresent: true,
          isCurrent: true,
        };
        this.setState({ board: newBoard });

        await sleep(this.state.speed);

        newBoard[i][col] = {
          ...newBoard[i][col],
          isPresent: false,
          isCurrent: false,
        };
        this.setState({ board: newBoard });
      }

      //if position is not valid for queen
      newBoard[i][col] = {
        ...newBoard[i][col],
        isPresent: false,
        isCurrent: false,
      };
      newBoard = turnOffAttack(newBoard, this.state.size);
      this.setState({ board: newBoard });
      await sleep(this.state.speed);
    }
    return false;
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const turnOffAttack = (board, n) => {
  //making the board normal
  const newBoard = board.slice();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      newBoard[i][j] = {
        ...newBoard[i][j],
        isChecked: false,
        isAttacked: false,
        isCurrent: false,
      };
    }
  }

  return newBoard;
};

//function to mark the possible reachable cells from a queen at index [row,col]
const getChecked = (board, row, col, n) => {
  // console.log(1);
  const newBoard = board.slice();
  let pos = true; //if the position is valid for queen

  //for current row
  for (let i = 0; i < n; i++) {
    if (newBoard[row][i].isPresent) {
      newBoard[row][i] = { ...newBoard[row][i], isAttacked: true };
      pos = false;
    } else {
      newBoard[row][i] = { ...newBoard[row][i], isChecked: true };
    }
  }

  //for current col
  for (let i = 0; i < n; i++) {
    if (newBoard[i][col].isPresent) {
      newBoard[i][col] = { ...newBoard[i][col], isAttacked: true };
      pos = false;
    } else {
      newBoard[i][col] = { ...newBoard[i][col], isChecked: true };
    }
  }

  //left upper diagonal
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (newBoard[i][j].isPresent) {
      newBoard[i][j] = { ...newBoard[i][j], isAttacked: true };
      pos = false;
    } else {
      newBoard[i][j] = { ...newBoard[i][j], isChecked: true };
    }
  }

  //left lower diagonal
  for (let i = row, j = col; i < n && j >= 0; i++, j--) {
    if (newBoard[i][j].isPresent) {
      newBoard[i][j] = { ...newBoard[i][j], isAttacked: true };
      pos = false;
    } else {
      newBoard[i][j] = { ...newBoard[i][j], isChecked: true };
    }
  }

  //right upper diagonal
  for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
    if (newBoard[i][j].isPresent) {
      newBoard[i][j] = { ...newBoard[i][j], isAttacked: true };
      pos = false;
    } else {
      newBoard[i][j] = { ...newBoard[i][j], isChecked: true };
    }
  }

  //right lower diagonal
  for (let i = row, j = col; i < n && j < n; i++, j++) {
    if (newBoard[i][j].isPresent) {
      newBoard[i][j] = { ...newBoard[i][j], isAttacked: true };
      pos = false;
    } else {
      newBoard[i][j] = { ...newBoard[i][j], isChecked: true };
    }
  }

  newBoard[row][col] = {
    ...newBoard[row][col],
    isPresent: true,
    isCurrent: true,
  };
  return [newBoard, pos];
};

const createBoard = (n) => {
  //for creating the board
  const rows = [];
  for (let i = 0; i < n; i++) {
    const cols = [];
    for (let j = 0; j < n; j++) {
      cols.push(getCell(i, j));
    }
    rows.push(cols);
  }
  return rows;
};

const getCell = (row, col) => {
  //for creating every cell of board
  return {
    row,
    col,
    isPresent: false,
    isChecked: false,
    isAttacked: false,
    isCurrent: false,
  };
};

export default Queen;
