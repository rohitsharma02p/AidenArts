
const httpStatus = require('http-status');
const config = require('../config/config');
const { BuyTransaction } = require('../models');
const ApiError = require('../utils/ApiError');




    const savetransactionDetails = async (txnData) => {
        const transaction = await BuyTransaction.create(txnData);
        if (transaction.length == 0) {
          throw new ApiError(httpStatus.NO_CONTENT, "Not Able to Save Transaction Details");
        }
        return transaction;
      };
  




  module.exports = {
    savetransactionDetails,
  };