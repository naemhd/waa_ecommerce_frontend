const { default: axios } = require("axios");
const { BACKEND_SERVER } = require("../globals");
const { loadUserData } = require("../localStorage");

module.exports.getNotApprovedUsers = function () {
  const data = loadUserData();
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt;
  return axios
    .get(`${BACKEND_SERVER}/users/need-approval`)
    .then((res) => res.data);
};

module.exports.getNotApprovedReviews = function () {
  const data = loadUserData();
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt;
  return axios
    .get(`${BACKEND_SERVER}/reviews/not-approved`)
    .then((res) => res.data)
}

module.exports.approveUser = function (user_id) {
  const data = loadUserData();
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt;
  return axios
    .put(`${BACKEND_SERVER}/users/${user_id}/approve`)
    .then((res) => res.data)
}

module.exports.approveReview = function (review_id) {
  const data = loadUserData();
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.jwt;
  return axios
    .put(`${BACKEND_SERVER}/reviews/${review_id}/approve`)
    .then((res) => res.data)
}
