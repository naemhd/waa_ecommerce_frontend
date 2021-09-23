const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");
const { loadUserData } = require("../localStorage");

module.exports.getCurrentUserCart = function () {
  const data = loadUserData();
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt;
  return axios
    .get(`${BACKEND_SERVER}/cart`)
    .then((res) => res.data);
};

module.exports.setProductIntoCart = function (product_id) {
    const data = loadUserData();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt;
    return axios
      .put(`${BACKEND_SERVER}/cart/product/${product_id}`)
      .then((res) => res.data);
};

module.exports.removeProductFromCart = function (product_id) {
  const data = loadUserData();
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt;
  return axios
    .delete(`${BACKEND_SERVER}/cart/product/${product_id}`)
    .then((res) => res.data);
};
