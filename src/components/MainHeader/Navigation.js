import React from 'react';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && ( //condicion ternaria: si el valor de autenticacion es 1 se ejecuta lo que esta luego del &&, de lo contrario devuelve null (no hay else en esta simplificacion)
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button> {/* mando el event solamente */}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
