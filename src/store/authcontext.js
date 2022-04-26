import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false, //este valor supongo que es por una cuestion de sintaxis en la notacion de objetos que debe inicializarse
});

export default AuthContext;
