import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  getAllOrders,
  getSellerOrders,
  updateOrderStatus,
} from "../../shared/api-calls/ordersAPI";
import { SELLER_ROLE } from "../../shared/globals";
import "./Orders.css";

const Orders = (props) => {
  const [orders, setOrders] = useState(null);
  const [status, setStatus] = useState("0");
  const history = useHistory();

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  };

  const userID = props.currentUser.id;

  const handleSubmit = (orderId) => {
    updateOrderStatus(orderId, status)
      .then((data) => {
        history.push("/")
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (props.currentUser.role === SELLER_ROLE) {
      getSellerOrders()
        .then((data) => {
          setOrders(data);
        })
        .catch((e) => console.log(e));
    } else {
      getAllOrders(userID)
        .then((data) => {
          setOrders(data);
        })
        .catch((e) => console.log(e));
    }
  }, [props.currentUser.role, userID]);

  return (
    <div className="products-container card-deck">
      {orders ? orders.map((o, index) => {
        return (
          <div key={index} className="card panel">
            <div className="panel-heading">
              {"  "}
              <label>Order # {o.id}</label>&nbsp; &nbsp; &nbsp; &nbsp;
              <label>
                {/* {" "}
                Total:{" "}
                {o.product ?
                  o.product
                    .map((p) => p.price)
                    .reduce((sum, current) => sum + current, 0)
                  :
                  0
                }{" "}
                $ */}
              </label>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <label>Status : {o.status}</label>
            </div>
            {o.product ? o.product.map((p, index) => {
              return (
                <div
                  key={index}
                  className="card"
                  style={{ margin: "15px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {p.price}
                    </h6>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              );
            })
              : null}
            <>
              {props.currentUser.role === SELLER_ROLE ? (
                <div>
                  <div className="form-group">
                    <label>Order Status</label>
                    <select
                      label="status"
                      name="status"
                      onChange={handleChangeStatus}
                      defaultValue="0"
                    >
                      <option value="0">Canceled</option>
                      <option value="1">Accepted</option>
                      <option value="2">Shipped</option>
                      <option value="3">Deliverd</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-success btn-block"
                    type="submit"
                    onClick={() => handleSubmit(o.id)}
                  >
                    Change
                  </button>
                </div>
              ) : null}
            </>
          </div>
        );
      })
        : null}
    </div>
  );
};

export default Orders;
