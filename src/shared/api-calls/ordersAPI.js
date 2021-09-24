const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");

module.exports.getAllOrders = function (id) {
  return axios
    .get(`${BACKEND_SERVER}/users/${id}/orders`)
    .then((res) => res.data);
};

module.exports.getSellerOrders = function () {
  return axios.get(`${BACKEND_SERVER}/orders/seller`).then((res) => res.data);
};

module.exports.updateOrderStatus = function (orderid, status) {
  return axios
    .put(`${BACKEND_SERVER}/orders/${orderid}?status=${status}`)
    .then((res) => res.data);
};

module.exports.createOrder = function (data) {
  return axios.post(`${BACKEND_SERVER}/orders`, data).then((res) => res.data);
};
