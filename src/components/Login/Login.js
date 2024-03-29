import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
/* import { useContext } from "react/cjs/react.production.min"; */
import AuthContext2 from "../../store/authcontext";
import Input from '../UI/Input/Input'

const emailReducer = (state, action) => {
  //recibe un obj en action, y en state es como que guarda el ultimo snapshot de los valores del state o algo asi (en este caso los valores de emailValue y emailIsValid)
  if (action.type === "USER_INPUT") {
    return { emailValue: action.val, emailIsValid: action.val.includes("@") }; //entonces cada vez que se dispara el onChange del input de email, se llama a emailChangeHandler, que llama a dispatchEmail y retornamos esto
  } //lo que retornamos arriba es el action.val (que es el value del event, o sea lo que esta ingresado en el input en ese momento, y un booleano que depende de si el action.val incluye o no un arroba)

  if (action.type === "INPUT_BLUR") {
    return {
      emailValue: state.emailValue,
      emailIsValid: state.emailValue.includes("@"),
    }; //con state.value estamos usando el ultimo snapshot value que quedo registrado para esta accion, que sera lo que se vaya retornando en el if de arriba
  }
  //lo que sea que retornemos aca re-seteara el state actualizado de emailState con los valores de emailValue && emailIsValid a los cuales se acceden mediante la notacion de objeto
  return { emailValue: "", emailIsValid: false };
};

const passReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { passValue: action.val, passIsValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      passValue: state.passValue,
      passIsValid: state.passValue.trim().length > 6,
    };
  }

  return { passValue: "", passIsValid: false };
};

const Login = (props) => {
  /* const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(); */
  /* const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    emailValue: "", //valores iniciales
    emailIsValid: null,
  });

  const [passState, dispatchPass] = useReducer(passReducer, {
    passValue: "",
    passIsValid: null,
  });

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { emailIsValid: eValid } = emailState
  const { passIsValid: pValid } = passState

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(eValid && pValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [eValid, pValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value }); //al llamar a dispatchEmail disparamos emailReducer function, y enviamos este obj como param que llegara hasta la function triggered by dispatchEmail

    /* setFormIsValid(
      event.target.value.includes('@') && passState.passValue.trim().length > 6
    ); */
  };

  const passwordChangeHandler = (event) => {
    /* setEnteredPassword(event.target.value); */
    dispatchPass({ type: "USER_INPUT", val: event.target.value });

    /* setFormIsValid(
      emailState.emailIsValid && event.target.value.trim().length > 6
    ); */
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" }); //solo necesitamos este valor para mandar
  };

  const validatePasswordHandler = () => {
    dispatchPass({ type: "INPUT_BLUR" });
  };

  const ctx = useContext(AuthContext2)

  const emailInputRef = useRef()
  const passInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) { //si el form es valido ingresando el @ y un pass > 6 chars, entonces esta todo bien
      ctx.onLogin2(emailState.emailValue, passState.passValue);
    } else if (!eValid) { //si el email es invalido porque le falta el @
      emailInputRef.current.goToActivateFocus() //se llama al metodo goToActivateFocus que esta declarado en el componente hijo dentro de un useImperative
    } else { //si el email es valido puede ser que el pass sea invalido
      passInputRef.current.goToActivateFocus()
    }
   
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <Input
      ref={emailInputRef}
      id="email"
      label="E-mail"
      type="email"
      stateValid={emailState.emailIsValid}
      value={emailState.emailValue}
      onChange={emailChangeHandler}
      onBlur={validateEmailHandler}
      />
      <Input
      ref={passInputRef}
      id="password"
      label="Password"
      type="password"
      stateValid={passState.passIsValid}
      value={passState.passValue}
      onChange={passwordChangeHandler}
      onBlur={validatePasswordHandler}
      />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} /* disabled={!formIsValid} */>
            {" "}
            {/* si el formulario no es valido, entonces se desactiva para su uso, ese valor se baja */}
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
