import React, {useState, useEffect} from "react";

const AuthContext2 = React.createContext({
  isLoggedIn2: false, //este valor supongo que es por una cuestion de sintaxis en la notacion de objetos que debe inicializarse
  onLogout2: () => {}, //no es obligatorio agregarla aca para que funcione, pero me habilita la funcion de autocompletado en otras partes del programa
  onLogin2: (email, password) => {} //espera dos params que en login.js se pasan con los states de emailState y passState
});

export const AuthCtxProvider = (props) => { //las funciones y states de este ctx arrow function como se invocara en el index.js podra leerse de manera global/contexto global
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return <AuthContext2.Provider value={{isLoggedIn2: isLoggedIn, onLogout2: logoutHandler, onLogin2: loginHandler}}>{props.children}</AuthContext2.Provider> //esto se retorna y se leera desde 
                                                                                                                                                        //el index que es donde se invoca el provider
};

export default AuthContext2;
