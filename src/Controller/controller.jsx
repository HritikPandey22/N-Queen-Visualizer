import React from "react";
import "./controller.css";

export default function Controller(props) {
  return (
    <div className="containerControl">
      <div className="temp">
        <input
          type="range"
          min={1}
          max={8}
          onChange={props.sizeChanger}
        />
        <label className="Clabel">Size</label>
      </div>

      <div className="temp">
        <input type="range" min={10} max={100} onChange={props.speedChanger} />
        <label className="Clabel">Speed</label>
      </div>
    </div>
  );
}
