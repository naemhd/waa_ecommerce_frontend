import { useState } from "react";
import { decodeToken } from "react-jwt";

import { saveUserData } from "../../shared/localStorage";
import { login, register } from "../../shared/api-calls/authAPI";
import Login from "../../components/Login/Login";

const Authenticate = ({ setLoggedIn, setCurrentUser }) => {
    const [serverError, setServerError] = useState("");
    const onLogin = (username, password ) => {
        login(username, password)
            .then((data) => {
                saveUserData(data.token);
                const decoded = decodeToken(data.token);
                setCurrentUser(decoded);
                setLoggedIn(true);
            })
            .catch((err) => setServerError(err));
    };

    const onRegister = ({ username, email, password }) => {
        register(username, email, password)
            .then((data) => {
                saveUserData(data.token);
                const decoded = decodeToken(data.token);
                setCurrentUser(decoded);
                setLoggedIn(true);
            })
            .catch((err) => setServerError(err));
    };
    return (
        <div>
            <h1>html login and register</h1>

            <Login onLogin={onLogin} />

        </div>

    );
};

export default Authenticate;
