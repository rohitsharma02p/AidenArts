const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const apiResponseMessage = require('../config/apiResponse')
const { transactionService } = require('../services');


const saveTxnDetails = catchAsync(async (req, res) => {

    const txnDetails  = await transactionService.savetransactionDetails(req.body);
    res.status(httpStatus.CREATED).send({
        status: httpStatus.CREATED,
        message: apiResponseMessage.savedTransaction,
        return: txnDetails
      });
  });

module.exports = {
    saveTxnDetails
  };
  