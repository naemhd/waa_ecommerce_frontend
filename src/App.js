import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Authenticate from "./pages/Authenticate/Authenticate";
import Header from "./components/Header";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import { loadUserData, removeUserData } from "./shared/localStorage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import axios from "axios";
import NewProduct from "./pages/NewProduct/NewProduct";
import { addProduct } from "./shared/api-calls/productsAPI";
import { ADMIN_ROLE } from "./shared/globals";
import { addProductIntoCart } from "./shared/api-calls/cartAPI";
import Home from "./pages/Home/Home";
import "./App.css"

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [products, setProducts] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (loadUserData()) {
      const data = loadUserData();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt;
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
      axios.defaults.headers.common['Content-Type'] = "application/json";
      axios.defaults.headers.common['Accept'] = "application/json";
      setLoggedIn(true);
      setCurrentUser(data);
      data.role === ADMIN_ROLE ? setIsAdmin(true) : setIsAdmin(false);
    }
  }, []);


  const onSignOut = () => {
    removeUserData();
    setLoggedIn(false);
    setCurrentUser({});
    setIsAdmin(false);
  };

  const cartAddingHandler = (product) => {
    addProductIntoCart(product.id).then(res => {
      setCartProducts([...cartProducts, product]);
    }).catch(e => console.log(e));
  }

  const createProduct = (product, history) => {
    console.log("product", product);
    addProduct(product)
      .then(data => {
        setProducts([...products, data])
        history.push("/products");
      }).catch(e => console.log(e))
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
            path="/home"
            condition={isLoggedIn}
            redirectRoute="/auth"
          >
            <Home
              isAdmin={isAdmin}
              cartAddingHandler={cartAddingHandler}
              cartProducts={cartProducts}
              currentUser={currentUser}
              products={products}
              setProducts={setProducts}
            />
          </PrivateRoute>

          <PrivateRoute
            path="/new-product"
            condition={isLoggedIn}
            redirectRoute="/auth"
          >
            <NewProduct addProduct={createProduct} />
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
            <ProductDetails cartAddingHandler={cartAddingHandler} cartProducts={cartProducts} />
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
              setIsAdmin={setIsAdmin}
            />
          </PrivateRoute>
          <Redirect to="/home" />
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
