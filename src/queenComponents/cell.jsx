import React, { Component } from "react";
import "./style.css";
import queen from "./queen.png";

export default class Cell extends Component {
  render() {
    return (
      <div>
        {/* <h1>hello</h1> */}
        <div className={this.getClassName()} style={this.color()}>
          {this.props.cell.isPresent && (
            <img src={queen} height="50px" style={{ padding: "25px" }}></img>
          )}
        </div>
      </div>
    );
  }

  getClassName = () => {
    if (this.props.cell.isAttacked) return "boardCell attacked";
    else if (this.props.cell.isPresent) return "boardCell present";
    else if (this.props.cell.isCurrent) return "boardCell current";
    else if (this.props.cell.isChecked) return "boardCell checked";
    else return "boardCell";
  };

  color = () => {
    if ((this.props.cell.row + this.props.cell.col) % 2 === 0) {
      return {
        backgroundColor: "white",
      };
    } else {
      return {
        backgroundColor: "grey",
      };
    }
  };
}
