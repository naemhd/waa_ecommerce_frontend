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
import Orders from "./pages/Orders/Orders";
import { loadUserData, removeUserData } from "./shared/localStorage";

import "./App.css"
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import axios from "axios";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
<<<<<<< HEAD
  const [reviews, setReviews] = useState([{ id: 1, descprtion: "This dildo is shit dont work correctly ", product: { name: "Text"} },
  { id: 2, descprtion: "Nice Pen", product: { name: "One Twp"}}]);
  const [users, setUsers] = useState([{ id: 1, name: "First User", billing_address: "Test" },
  { id: 2, name: "Second User", billing_address: "One Two" }]);
=======


>>>>>>> dea6af51201a3b1ce104be2ed8a81c767e3ed3b7

  useEffect(() => {
    if (loadUserData()) {
      const data = loadUserData();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt;
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
<<<<<<< HEAD
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
=======
      {isLoggedIn ? <Header signOutHandler={onSignOut} /> : null}
      <div className="all-container">
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
            path="/product-details/:id"
            condition={isLoggedIn}
            redirectRoute="/auth"
          >
            <ProductDetails currentUser={currentUser} />
          </PrivateRoute>
          <PrivateRoute
            path="/admin"
            condition={isLoggedIn}
            redirectRoute="/auth"
          >
            <Admin currentUser={currentUser} />
          </PrivateRoute>
          <PrivateRoute
            path="/orders"
            condition={isLoggedIn}
            redirectRoute="/auth"
          >
            <Orders currentUser={currentUser} />
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
      </div>
>>>>>>> dea6af51201a3b1ce104be2ed8a81c767e3ed3b7
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
