import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation /* isLoggedIn={props.isAuthenticated} */ //baja, el state de autenticacion, que es 0 inicialmente
      /* onLogout={props.onLogout} */ //sube el event onclick
      /> 
    </header>
  );
};

export default MainHeader;
