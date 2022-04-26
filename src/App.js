import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/authcontext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider 
    value={{
      isLoggedIn: isLoggedIn, //el primero es la referencia a la propiedad del authcontext.js, el segundo es el valor del state
      onLogout: logoutHandler //tambien podemos setear props en context para apuntar a functions como en este caso
    }}
    >
      <MainHeader /* isAuthenticated={isLoggedIn} */ onLogout={logoutHandler} /> {/* baja el booleano de autenticacion y sube el evento onclick*/}
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />} {/* si es falso que estoy autenticado, muestro el login comp, y sube el emailState.value y el enteredPassword cuando el form es submitted*/}
        {isLoggedIn && <Home onLogout={logoutHandler} />} {/* si estoy loggeado muestro el home comp, y no se que sube pero dispara el logoutHandler*/}
      </main>
    
    </AuthContext.Provider>

  );
}

export default App;
