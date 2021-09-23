import { useState } from "react";
import { decodeToken } from "react-jwt";

import { saveUserData } from "../../shared/localStorage";
import { login, register } from "../../shared/api-calls/authAPI";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

const Authenticate = ({ setLoggedIn, setCurrentUser }) => {
  const [isNewUser, setisNewUser] = useState(false);
  const onLogin = (username, password) => {
    login(username, password)
      .then((data) => {
        saveUserData(data.token);
        const decoded = decodeToken(data.token);
        setCurrentUser(decoded);
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  const onRegister = (userObj) => {
    register(userObj)
      .then((data) => {
        saveUserData(data.token);
        const decoded = decodeToken(data.token);
        setCurrentUser(decoded);
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  const SwitchUserStatus = () => {
    isNewUser ? setisNewUser(false) : setisNewUser(true);
  };
  return (
    <div>
      {isNewUser ? (
        <>
          <Register onRegister={onRegister} btn={SwitchUserStatus} />
          
        </>
      ) : (
        <div>
          <Login onLogin={onLogin} btn={SwitchUserStatus} />
        
        </div>
      )}
    </div>
  );
};

export default Authenticate;
