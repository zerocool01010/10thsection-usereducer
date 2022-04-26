import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/authcontext";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <>
      {" "}
      <MainHeader /* isAuthenticated={isLoggedIn} */ />
      {/* baja el booleano de autenticacion y sube el evento onclick*/}
      <main>
        {!ctx.isLoggedIn2 && <Login />}
        {/* si es falso que estoy autenticado, muestro el login comp, y sube el emailState.value y el enteredPassword cuando el form es submitted*/}
        {ctx.isLoggedIn2 && <Home />}
        {/* si estoy loggeado muestro el home comp, y no se que sube pero dispara el logoutHandler*/}
      </main>
    </>
  );
}

export default App;
