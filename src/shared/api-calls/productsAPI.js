const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");
const { loadUserData } = require("../localStorage");



module.exports.getAllProducts = function () {
    const data = loadUserData();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt;
    return axios
        .get(`${BACKEND_SERVER}/products`)
        .then((res) => res.data)
};

module.exports.addProduct = function (product) {
    const data = loadUserData();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt;
    return axios
        .post(`${BACKEND_SERVER}/products`, product)
        .then((res) => res.data)
};

module.exports.getOneProduct = function (id) {
    const data = loadUserData();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt;
    return axios
        .get(`${BACKEND_SERVER}/products/${id}`)
        .then((res) => res.data)
};
