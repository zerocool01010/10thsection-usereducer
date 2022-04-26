import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false, //este valor supongo que es por una cuestion de sintaxis en la notacion de objetos que debe inicializarse
  onLogout: () => {} //no es obligatorio agregarla aca para que funcione, pero me habilita la funcion de autocompletado en otras partes del programa
});

export default AuthContext;
