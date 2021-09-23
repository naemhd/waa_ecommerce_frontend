import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
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
import { setProductIntoCart } from "./shared/api-calls/cartAPI";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cartProducts, setCartProducts] = useState([]);

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

  const cartAddingHandler = (product, history) => {
    //add cart to db here...
    setProductIntoCart(product.id);
    setCartProducts([...cartProducts, product]);
    history.push("/cart");
  }

  return (
    <Router>
      {isLoggedIn ? <Header
        signOutHandler={onSignOut}
        currentUser={currentUser}
        setCartProducts={setCartProducts}
        noOfCartProducts={cartProducts.length} /> : null}
      <div className="all-container">
        <Switch>
          <PrivateRoute
            path="/products"
            condition={isLoggedIn}
            redirectRoute="/auth"
          >
            <Products cartAddingHandler={cartAddingHandler} />
          </PrivateRoute>
          <PrivateRoute
            path="/cart"
            condition={isLoggedIn}
            redirectRoute="/auth"
          >
            <Cart products={cartProducts} setProducts={setCartProducts} />
          </PrivateRoute>
          <PrivateRoute
            path="/product-details/:id"
            condition={isLoggedIn}
            redirectRoute="/auth"
          >
            <ProductDetails cartAddingHandler={cartAddingHandler} />
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
