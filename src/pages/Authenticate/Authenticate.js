import { useState } from "react";
import { decodeToken } from "react-jwt";

import { saveUserData } from "../../shared/localStorage";
import { login, register } from "../../shared/api-calls/authAPI";

const Authenticate = ({ setLoggedIn, setCurrentUser }) => {
    const [serverError, setServerError] = useState("");
    const onLogin = ({ username, password }) => {
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
        <div>html login and register</div>
    );
};

export default Authenticate;
