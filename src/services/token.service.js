const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const userService = require('./user.service');
const { Token } = require('../models');
const ApiError = require('../utils/ApiError');
const axios = require('axios')
const { tokenTypes } = require('../config/tokens');


/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
 const saveToken = async (token, expires, userId, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires,
    blacklisted,
  });
  return tokenDoc;
};


const getUserInfoByAuth0Token = async (token) => {
  var options = {
    method: "GET",
    url: `https://${config.auth0.domain}/userinfo`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(options).catch(function (error) {
     // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      //   console.log(error.request);


      // Something happened in setting up the request that triggered an Error
      //   console.log("Error", error.message);
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
  });

  return response.data;
};


module.exports = {
  saveToken,
  getUserInfoByAuth0Token
};
