const { ethers } = require("ethers");
require("dotenv").config();

var abi = require("../contractAbis/smartcontract.json");
const contractAddress = "0x67413fbEa99Bf586a3E9a01FCF77fFb298C5e254";
const provider = new ethers.providers.JsonRpcProvider(
  "https://responsive-restless-yard.matic-testnet.discover.quiknode.pro/2619f8ad8ffe2b135281590699d1eef3459da0db/"
);
// let signer;
let privateKey = process.env.WALLET_PRIVATE_KEY;
let walletWithProvider = new ethers.Wallet(privateKey, provider);
let signer = walletWithProvider.connect(provider);
let Contract = new ethers.Contract(contractAddress, abi, signer);

let balancePromise = walletWithProvider.getBalance();
balancePromise.then((balance) => {
  console.log("Balance is", ethers.utils.formatEther(balance));
});

const amountInDollar = (20).toString();

let Amountoptions = ethers.utils.parseUnits(amountInDollar.toString(), "ether");
console.log(Amountoptions);





// const token = Contract.BuyTkens(
//  "0x080DBd90791D8f6592C4B69d7F452c2B8222E67A",
//     //       referralAddress,
//           Amountoptions
//     //       options
//         );
// token.then(res=>console.log(res))


// ====================================
// const token = Contract.firstroundTranfer(
//  "0x080DBd90791D8f6592C4B69d7F452c2B8222E67A",
//     //       referralAddress,
//           Amountoptions
//     //       options
//         );
// token.then(res=>console.log(res))




// =================================

//     await token.wait();
//     console.log(token);

const buyToken = async (txnData) => {
  //   try {
  //     const { wallet_Address, referralCode, noOf_Vomo, price_amountInDollar } =
  //       txnData;
  //     const referralAddress = referralCode;
  // // Wallet address is the buyer Address
  //     console.log(
  //       wallet_Address,
  //       referralAddress,
  //       noOf_Vomo,
  //       price_amountInDollar
  //     );
  //     const noOf_VomoToSend = (noOf_Vomo).toString();
  //     const amountInDollar = (price_amountInDollar).toString();
  //     let Amountoptions = ethers.utils.parseUnits((amountInDollar).toString(), "ether");
  //     let options = ethers.utils.parseUnits((noOf_VomoToSend).toString(), "ether");
  //     const token = await Contract.IbuyTokens(
  //       wallet_Address,
  //       referralAddress,
  //       Amountoptions,
  //       options
  //     );
  //     await token.wait();
  //     console.log(token);
  //   } catch (error) {
  //     throw error;
  //   }
};

async function test(txnData) {
  //   const { referralCodes } = require("../models");
  //   const referalDetail = await referralCodes.findOne({
  //     where: {
  //       referralCode: txnData.referralCode
  //     }
  //   });
  //   const walletAddress = (referalDetail==null)?"0x0000000000000000000000000000000000000000":referalDetail.walletAddress;
  //   // const { walletAddress } = referalDetail;
  //   Object.keys(txnData).forEach(function (key, index) {
  //     if (key == "referralCode") {
  //       txnData[key] = walletAddress;
  //     }
  //   });
  //   buyToken(txnData);
}

async function paymentAPi(txnData) {
  //   // test(txnData);
  //   if (txnData.payment_id) {
  //     const payment_id = txnData.payment_id;
  //     // console.log("Type", typeof payment_id);
  //     var axios = require("axios");
  //     var config = {
  //       method: "get",
  //       url: `https://api-sandbox.nowpayments.io/v1/payment/${payment_id}`,
  //       headers: {
  //         "x-api-key": "GBKTS6P-ANQMNAX-J8W6DBR-R4CEJZT"
  //       }
  //     };
  //     axios(config)
  //       .then(function (response) {
  //         const status = response.data.payment_status;
  //         // console.log(status);
  //         if (status == "finished") {
  //           test(txnData);
  //         }
  //         // console.log(JSON.stringify(response.data));
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
}

module.exports = { paymentAPi };
