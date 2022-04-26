import React, {useContext} from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../store/authcontext';

const Navigation = () => {
  const ctx = useContext(AuthContext)

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && ( //condicion ternaria: si el valor de autenticacion es 1 se ejecuta lo que esta luego del &&, de lo contrario devuelve null (no hay else en esta simplificacion)
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button> {/* mando el event solamente, antes con props, ahora usando ctx directamente a App.js salteando el MainHeader.js */}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
