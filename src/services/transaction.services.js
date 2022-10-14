
const httpStatus = require('http-status');
const config = require('../config/config');
const { BuyTransaction,TimeStampEvent } = require('../models');
const ApiError = require('../utils/ApiError');




    const savetransactionDetails = async (txnData) => {
        const transaction = await BuyTransaction.create(txnData);
        if (transaction.length == 0) {
          throw new ApiError(httpStatus.NO_CONTENT, "Not Able to Save Transaction Details");
        }
        return transaction;
      };
  
      
      
const timestamps = async()=>{
  const time_stamp = await TimeStampEvent.find({});
  if (!time_stamp) {
    throw new ApiError(httpStatus.NO_CONTENT, "Not TimeStamp Details");
  }

  //  console.log(timestamp)
  return time_stamp;
}



  module.exports = {
    savetransactionDetails,
    timestamps
  };