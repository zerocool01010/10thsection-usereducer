import React from "react";
import classes from "../../Login/Login.module.css";

const Inputs = (props) => {

    return <>
    <div
    className={`${classes.control} ${
        props.emailStateValid === false ? classes.invalid : ""
    }`}
  >
    <label htmlFor="email">E-Mail</label>
    <input
      type="email"
      id="email"
      value={props.emailStateValue}
      onChange={props.emailChangeHandler}
      onBlur={props.validateEmailHandler}
    />
  </div>
  <div
    className={`${classes.control} ${
        props.passStateIsValid === false ? classes.invalid : ""
    }`}
  >
    <label htmlFor="password">Password</label>
    <input
      type="password"
      id="password"
      value={props.passStateValue}
      onChange={props.passwordChangeHandler}
      onBlur={props.validatePasswordHandler}
    />
  </div>
  </>;
}

export default Inputs;