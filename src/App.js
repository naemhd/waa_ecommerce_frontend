import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Authenticate from "./pages/Authenticate/Authenticate";
import Header from "./components/Header";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Admin from "./pages/Admin/Admin";
import { loadUserData, removeUserData } from "./shared/localStorage";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [reviews, setReviews] = useState([{ id: 1, descprtion: "This dildo is shit dont work correctly ", product: { name: "Text"} },
  { id: 2, descprtion: "Nice Pen", product: { name: "One Twp"}}]);
  const [users, setUsers] = useState([{ id: 1, name: "First User", billing_address: "Test" },
  { id: 2, name: "Second User", billing_address: "One Two" }]);

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
      <Header signOutHandler={onSignOut} />
      <Switch>
        <PrivateRoute
          path="/products"
          condition={isLoggedIn}
          redirectRoute="/auth"
        >
          <Products currentUser={currentUser} />
        </PrivateRoute>
        <PrivateRoute
          path="/cart"
          condition={isLoggedIn}
          redirectRoute="/auth"
        >
          <Cart currentUser={currentUser} />
        </PrivateRoute>
        <PrivateRoute
          path="/admin"
          condition={isLoggedIn}
          redirectRoute="/auth"
        >
          <Admin currentUser={currentUser} reviews={reviews} setReviews={setReviews} users={users} setUsers={setUsers}/>
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
        <Redirect to="/products" />
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
