const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");



module.exports.getAllProducts = function () {
    return axios
        .get(`${BACKEND_SERVER}/products`)
        .then((res) => res.data)
};

module.exports.addProduct = function (product) {
    return axios
        .post(`${BACKEND_SERVER}/products`, product)
        .then((res) => res.data)
};

module.exports.getOneProduct = function (id) {
    return axios
        .get(`${BACKEND_SERVER}/products/${id}`)
        .then((res) => res.data)
};
