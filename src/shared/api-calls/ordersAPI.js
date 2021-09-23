const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");

module.exports.getAllOrderss = function (id) {
  return axios
    .get(`${BACKEND_SERVER}/users/${id}/orders`)
    .then((res) => res.data);
};
