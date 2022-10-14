const httpStatus = require('http-status');
const config = require('../config/config')
const ApiError = require('../utils/ApiError');
const axios = require('axios')
var qs = require("qs");


const signUpUser = async (userInfo) => {
    var options = {
      method: "POST",
      url: `https://${config.auth0.domain}/dbconnections/signup`,
      data: {
        client_id: config.auth0.client_id,
        email: userInfo.email,
        password: userInfo.password,
        connection: "Username-Password-Authentication",
      },
    };
  
    const response = await axios(options).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //   console.log(error.response.data);
        if (error.response.data.code == "invalid_signup") {
          throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
        } else {
          throw new ApiError(httpStatus.BAD_REQUEST, error.response.data.message);
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        //   console.log(error.request);
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Internal Server Error"
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        //   console.log("Error", error.message);
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Internal Server Error"
        );
      }
    });
    return response.data;
  };

  /**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
   const loginUserByauth0 = async (email, password) => {
    var data = qs.stringify({
      grant_type: "password",
      username: email,
      password: password,
      audience: config.auth0.audience,
      scope: "openid profile email",
      client_id: config.auth0.client_id,
      client_secret: config.auth0.client_secret,
    });
    var options = {
      method: "POST",
      url: `https://${config.auth0.domain}/oauth/token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    const response = await axios(options).catch(function (error) {
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data.error == "invalid_grant") {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            error.response.data.error_description
          );
        } else {
          throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        //   console.log(error.request);
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Internal Server Error"
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        //   console.log("Error", error.message);
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Internal Server Error"
        );
      }
    });
    return response.data;
  };


  module.exports = {
    signUpUser,
    loginUserByauth0
  }