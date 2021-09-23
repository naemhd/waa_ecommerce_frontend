import { useState } from "react";
import { saveUserData } from "../../shared/localStorage";
import { login, register } from "../../shared/api-calls/authAPI";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import axios from "axios";
import { ADMIN_ROLE } from "../../shared/globals";

const Authenticate = ({ setLoggedIn, setCurrentUser, setIsAdmin }) => {
  const [isNewUser, setisNewUser] = useState(false);
  const onLogin = (username, password) => {
    login(username, password)
      .then((res) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.jwt;
        saveUserData(res.data);
        setCurrentUser(res.data);
        setLoggedIn(true);
        res.data.role === ADMIN_ROLE ? setIsAdmin(true) : setIsAdmin(false);
      })
      .catch((err) => console.log("err logging in", err));
  };

  const onRegister = (userObj) => {
    register(userObj)
      .then(() => {
        setisNewUser(false);
      })
      .catch((err) => console.log("err registering", err));
  };

  const SwitchUserStatus = () => {
    isNewUser ? setisNewUser(false) : setisNewUser(true);
  };
  return (
    <div>
      {isNewUser ? (
        <Register onRegister={onRegister} SwitchUserStatus={SwitchUserStatus} />
      ) : (
        <Login onLogin={onLogin} SwitchUserStatus={SwitchUserStatus} />
      )}
    </div>
  );
};

export default Authenticate;
