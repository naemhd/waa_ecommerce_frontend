const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");

module.exports.login = function (username, password) {
  console.log(username + "+++++" + password);
  return axios
    .post(`${BACKEND_SERVER}/authenticate`, {
      username: username,
      password: password,
    })
    .then((res) => res.data)
    .catch((err) => {
      const error = err.response ? err.response.data.message : err.message;
      console.log(error);
      return error;
    });
};

module.exports.register = function (userObj) {
  return axios
    .post(`${BACKEND_SERVER}/users`,  userObj)
    .then((res) => res.data)
    .catch((err) => {
      const error = err.response ? err.response.data.message : err.message;
      console.log(error);
      return error;
    });
};
