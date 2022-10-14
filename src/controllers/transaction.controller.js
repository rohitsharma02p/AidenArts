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

  
  
const TimestampsOfRound = catchAsync(async(req,res)=>{
  const timestampDetails  = await transactionService.timestamps();
  res.status(httpStatus.OK).send({message:"Transaction Timestamps Returned successfully",data:timestampDetails})
})

const firstRoundTransfer = catchAsync(async(req,res)=>{
  const timestampDetails  = await buyTokenService.timestamps();
  res.status(httpStatus.OK).send({message:"Transaction Timestamps Returned successfully",data:timestampDetails})
})

module.exports = {
    saveTxnDetails,
    TimestampsOfRound,
    firstRoundTransfer
  };
  