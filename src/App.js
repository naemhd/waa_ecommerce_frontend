import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Authenticate from "./pages/Authenticate/Authenticate";
import Home from "./pages/Home/Home";
import { loadUserData, removeUserData } from "./shared/localStorage";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  console.log("isLoggedIn", isLoggedIn);
  useEffect(() => {
    if (loadUserData()) {
      const data = loadUserData();
      setLoggedIn(true);
      setCurrentUser(data);
    }
  }, []);

  const onSignOut = () => {
    removeUserData();
    setLoggedIn(false);
    setCurrentUser({});
  };

  return (
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path="/"
          condition={isLoggedIn}
          redirectRoute="/auth"
        >
          <Home signOutHandler={onSignOut} currentUser={currentUser} />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/auth"
          condition={!isLoggedIn}
          redirectRoute="/"
        >
          <Authenticate
            setLoggedIn={setLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        </PrivateRoute>
        {/* <Redirect */}
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ children, condition, redirectRoute, ...props }) => {
  return (
    <Route
      {...props}
      render={({ location }) =>
        condition ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectRoute,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
