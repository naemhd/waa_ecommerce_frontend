import React, { useState, useEffect, useHistory } from "react";
import { getAllOrderss } from "../../shared/api-calls/ordersAPI";
import "./Orders.css";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const userID = props.currentUser.id;

  //const history = useHistory();
  useEffect(() => {
    getAllOrderss(userID)
      .then((data) => {
        setOrders(data);
        console.log("orders ---- " + data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="products-container card-deck">
      {orders
        ? orders.map((o, index) => {
            return (
              <div key={index} className="card panel">
                <div className="panel-heading">
                  {"  "}
                  <label>Order # {o.id}</label>&nbsp; &nbsp; &nbsp; &nbsp;
                  <label>
                    {" "}
                    Total:{" "}
                    {o.product
                      .map((p) => p.price)
                      .reduce((sum, current) => sum + current, 0)}{" "}
                    $
                  </label>
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <label>Status : {o.status}</label>
                </div>
                {o.product.map((p, index) => {
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
                        {/* <button className="btn btn-link">Add to cart</button> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Orders;
