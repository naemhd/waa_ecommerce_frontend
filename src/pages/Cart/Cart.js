import React from "react";
import { useHistory } from "react-router";
import { createOrder } from "../../shared/api-calls/ordersAPI";
import { deleteCart, removeProductFromCart } from "../../shared/api-calls/cartAPI";
import "./Cart.css";

const Cart = ({ products, setProducts, setProductsIds, cartId }) => {
  const history = useHistory();
  // const product = { product  :  products};
  const deleteFromCart = (productId) => {
    removeProductFromCart(productId).then(res => {
      const id = parseInt(productId);
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      setProductsIds(updatedProducts.map(p => p.id));
    }).catch(e => console.log(e));
  }
  const handleCheckout = () => {
    const newOrder = {
      product: products
    }
    createOrder(newOrder)
      .then((data) => {
        deleteCart(cartId).then(() => {
          setProducts(null);
          history.push("/orders");
        }).catch(e => console.log(e))
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-center row">
        <div className="col-md-8">
          <div className="p-2">
            <h4>Shopping cart</h4>
            <div className="d-flex flex-row align-items-center pull-right">
              <span className="mr-1">Sort by:</span>
              <span className="mr-1 font-weight-bold">Price</span>
              <i className="fa fa-angle-down"></i>
            </div>
          </div>

          {/* Cart Products goes here... */}
          {products
            ? products.map((p, index) => {
              return (
                <div
                  className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded"
                  key={p.id}
                >
                  <div className="mr-1">
                    <img
                      className="rounded"
                      src="cartCar.jpeg"
                      width="70"
                      alt="cartCar"
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center product-details">
                    <span className="font-weight-bold">{p.title}</span>
                    <div className="d-flex flex-row product-desc">
                      <div className="size mr-1">
                        <span className="text-grey">Seller:</span>
                        <span className="font-weight-bold">
                          &nbsp;{p.seller.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center qty">
                    <i className="fa fa-minus text-danger"></i>
                    <h5 className="text-grey mt-1 mr-1 ml-1">1</h5>
                    <i className="fa fa-plus text-success"></i>
                  </div>
                  <div>
                    <h5 className="text-grey">${p.price}</h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => deleteFromCart(p.id)}
                    >
                      <i className="fa fa-trash mb-1 text-danger"></i>
                    </button>
                  </div>
                </div>
              );
            })
            : null}

          <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
            <input
              type="text"
              className="form-control border-0 gift-card"
              placeholder="discount code/gift card"
            />
            <button
              className="btn btn-outline-warning btn-sm ml-2"
              type="button"
            >
              Apply
            </button>
          </div>
          <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
            <button
              onClick={handleCheckout}
              className="btn btn-warning btn-block btn-lg ml-2 pay-button"
              type="button"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );


};

export default Cart;
