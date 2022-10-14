const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const transactionController = require('../../controllers/transaction.controller');

const router = express.Router();

router
  .route('/transactionDetails')
  .post(transactionController.saveTxnDetails)

router.get("/timestampOfRounds", transactionController.TimestampsOfRound);
router.post("/firstRoundTransfer", transactionController.firstRoundTransfer);

module.exports = router;