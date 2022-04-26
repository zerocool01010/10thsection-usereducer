import React from "react";
import classes from "../../Login/Login.module.css";

const Input = (props) => {

    return <>
    <div
    className={`${classes.control} ${
        props.stateValid === false ? classes.invalid : ""
    }`}
    >
    <label htmlFor={props.label}>{props.label}</label>
    <input
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  </div>
  </>;
}

export default Input;