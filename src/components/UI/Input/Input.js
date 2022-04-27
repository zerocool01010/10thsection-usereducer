import React, {useRef, useImperativeHandle} from "react";
import classes from "../../Login/Login.module.css";

const Input = React.forwardRef((props, ref) => { //es necesario wrappear toda la arrow function con ese forwardRef para que pueda leer el param ref, ya que sin esto no le puedo pasar refs como props a un comp
    const inputRef = useRef()

    const activateFocus = () => { //activateFocus solo se llamara si se llama al metodo goToActivateFocus declarado en un useImperative mas abajo
        inputRef.current.focus() //el metodo focus es algo que trabaja con el DOM, no es algo de React, es propio de Vainilla Javascript
    }

    useImperativeHandle(ref, () => { //lleva dos argumentos, primero el ref, luego la funcion que tiene simplemente metodos declarados con un apuntador, pero podria tener valores de variables tambien creo
        return {
            goToActivateFocus: activateFocus //cuando se llame a goToActivateFocus desde algun father component o simplemente desde fuera de este comp, entonces apuntara a activateFocus para llamarla
        }
    })

    return <>
    <div
    className={`${classes.control} ${
        props.stateValid === false ? classes.invalid : ""
    }`}
    >
    <label htmlFor={props.label}>{props.label}</label>
    <input
    ref={inputRef}
    type={props.type}
    id={props.id}
    value={props.value}
    onChange={props.onChange}
    onBlur={props.onBlur}
    />
  </div>
  </>;
})

export default Input;