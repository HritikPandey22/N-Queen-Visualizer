import React, { Component } from "react";
import Cell from "./cell";
import './style.css';

export default class Cells extends Component{
  render() {
    return (
        <div className='booard m-5' >
            {this.props.board.map( (row,rowidx)=>{
                return(
                    <div className="rows" key={rowidx}>
                        {row.map( (cell,cellidx)=>{
                            return(
                                <Cell
                                    key={cellidx}
                                    cell={cell}/>
                            );
                        } )}
                    </div>
                );
            } )}
        </div>
    );
}
}