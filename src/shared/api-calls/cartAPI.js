const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");

module.exports.getCurrentUserCart = function () {
  return axios.get(`${BACKEND_SERVER}/cart`).then((res) => res.data);
};

module.exports.addProductIntoCart = function (product_id) {
  return axios
    .put(`${BACKEND_SERVER}/cart/product/${product_id}`)
    .then((res) => res.data);
};

module.exports.removeProductFromCart = function (product_id) {
  return axios
    .delete(`${BACKEND_SERVER}/cart/product/${product_id}`)
    .then((res) => res.data);
};

module.exports.deleteCart = function (cartId) {
  return axios
    .delete(`${BACKEND_SERVER}/cart/${cartId}`)
    .then((res) => res.data);
};

