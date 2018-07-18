import React from "react";

const Button = props => (
  <button className={props.type === "Next" ? "Next" : "Prev"} onClick={props.type === "Next" ? props.nextFunc : props.prevFunc}>
    {props.type === "Next" ? "Next" : "Previous"}
  </button>
);

export default Button;
