const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");

module.exports.login = function (username, password) {
  return axios
    .post(`${BACKEND_SERVER}/authenticate`, {
      username: username,
      password: password,
    })
};

module.exports.register = function (userObj) {
  return axios
    .post(`${BACKEND_SERVER}/users`, userObj)
    .then((res) => res.data)
};
