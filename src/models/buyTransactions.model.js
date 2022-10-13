const mongoose = require('mongoose');

const BuyTransactionSchema = mongoose.Schema(
  {
    payment_id: {
      type: String,
      required: true,
    },
    wallet_Address: {
      type: String,
      required: true,
    },
    noOf_Idol: {
        type: String,
        required: true,
    },
    price_amountInDollar: {
        type: String,
      required: true,
  }
},
  {
    timestamps: true,
  }
);

const BuyTransaction = mongoose.model('BuyTransaction', BuyTransactionSchema);


module.exports = BuyTransaction;