import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => { //recibe un obj en action, y en state es como que guarda el ultimo snapshot de los valores del state o algo asi (en este caso los valores de emailValue y emailIsValid)
  if (action.type === 'USER_INPUT') {
    return {emailValue: action.val, emailIsValid: action.val.includes('@')} //entonces cada vez que se dispara el onChange del input de email, se llama a emailChangeHandler, que llama a dispatchEmail y retornamos esto
  } //lo que retornamos arriba es el action.val (que es el value del event, o sea lo que esta ingresado en el input en ese momento, y un booleano que depende de si el action.val incluye o no un arroba)
  
  if (action.type === 'INPUT_BLUR'){
    return {emailValue: state.emailValue, emailIsValid: state.emailValue.includes('@')} //con state.value estamos usando el ultimo snapshot value que quedo registrado para esta accion, que sera lo que se vaya retornando en el if de arriba
  }
  //lo que sea que retornemos aca re-seteara el state actualizado de emailState con los valores de emailValue && emailIsValid a los cuales se acceden mediante la notacion de objeto
  return {emailValue: '', emailIsValid: false}
};

const passReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {passValue: action.val, passIsValid: action.val.trim().length > 6}
  }
  if (action.type === 'INPUT_BLUR') {
    return {passValue: state.passValue, passIsValid: state.passValue.trim().length > 6}
  }

  return {passValue: '', passIsValid: false}
}

const Login = (props) => {
  /* const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(); */
  /* const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    emailValue: '', //valores iniciales
    emailIsValid: null,
  });

  const [passState, dispatchPass] = useReducer(passReducer, {
    passValue: '',
    passIsValid: null,
  })

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value}) //al llamar a dispatchEmail disparamos emailReducer function, y enviamos este obj como param que llegara hasta la function triggered by dispatchEmail

    setFormIsValid(
      event.target.value.includes('@') && passState.passValue.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    /* setEnteredPassword(event.target.value); */
    dispatchPass({type: 'USER_INPUT', val: event.target.value})

    setFormIsValid(
      emailState.emailIsValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});  //solo necesitamos este valor para mandar
  };

  const validatePasswordHandler = () => {
    dispatchPass({type: 'INPUT_BLUR'}); 
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.emailValue, passState.passValue);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.passIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.passValue}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}> {/* si el formulario no es valido, entonces se desactiva para su uso, ese valor se baja */}
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
