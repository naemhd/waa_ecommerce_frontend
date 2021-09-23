import { useState } from "react";
import { saveUserData } from "../../shared/localStorage";
import { login, register } from "../../shared/api-calls/authAPI";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

const Authenticate = ({ setLoggedIn, setCurrentUser }) => {
  const [isNewUser, setisNewUser] = useState(false);
  const onLogin = (username, password) => {
    login(username, password)
      .then((res) => {
        console.log("res", res.data);
        saveUserData(res.data);
        setCurrentUser(res.data);
        setLoggedIn(true);
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
