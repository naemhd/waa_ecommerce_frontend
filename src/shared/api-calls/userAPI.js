const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");

module.exports.followUser = function (sellerId) {
  return axios
    .post(`${BACKEND_SERVER}/users/${sellerId}/follow`)
    .then((res) => res.data);
};

module.exports.unFollowUser = function (sellerId) {
  return axios
    .post(`${BACKEND_SERVER}/users/${sellerId}/unfollow`)
    .then((res) => res.data);
};

module.exports.getSeller = function (sellerId) {
  return axios
    .get(`${BACKEND_SERVER}/users/${sellerId}`, { headers: { 'Access-Control-Allow-Origin': "*" } })
    .then((res) => res.data);
};
