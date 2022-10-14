
const httpStatus = require("http-status");

const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const { TimeStampEvent } = require("../models");
//
const Web3 = require("web3");
var abi = require("../contractAbis/smartcontract.json");
const contractAddress = "0x67413fbEa99Bf586a3E9a01FCF77fFb298C5e254";
const web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://responsive-restless-yard.matic-testnet.discover.quiknode.pro/2619f8ad8ffe2b135281590699d1eef3459da0db/"
  )
);
var contract = new web3.eth.Contract(abi, contractAddress);

const fetchEvents = async () => {
  const event = contract.events.allEvents({ fromBlock: "latest" });

  event
    .on("connected", (subscriptionId) => {
      console.log({ SubscriptionsID: subscriptionId });
    })
    .on("data", async (event) => {

      console.log(event);


    });
};

async function mapfunction(event) {
  // console.log(event)
  if(event.length==0){
    console.log("Not getting Past Events of Timestamp")
  }
  const mapedEvent = event.map((eventObj) => {
    return {
      event: eventObj.event,
      transactionHash: eventObj.transactionHash,
      timestamp: eventObj.returnValues.timestamp
    };
  });
  const timestamp = mapedEvent[0];

  try {
    await TimeStampEvent.create(timestamp);
  } catch (error) {
   console.log("DB Error While Saving Past Events")
  }
}
const fetchTimestampEvents = async () => {

  TimeStampEvent.deleteMany( function () {});
  try {
    const FirstRoundStart = await contract.getPastEvents("FirstRoundStart", {
      fromBlock: "28609760",
      toBlock: "28609865"
    });
    mapfunction(FirstRoundStart);
    const FirstRoundEnd = await contract.getPastEvents("FirstRoundEnd", {
      fromBlock: "28609760",
      toBlock: "28609865"
    });
    mapfunction(FirstRoundEnd);
    const SeconDroundEnd = await contract.getPastEvents("SeconDroundEnd", {
      fromBlock: "28609760",
      toBlock: "28609865"
    });
    mapfunction(SeconDroundEnd);
    const ThirdRoundEnd = await contract.getPastEvents("ThirdRoundEnd", {
      fromBlock: "28609760",
      toBlock: "28609865"
    });
    mapfunction(ThirdRoundEnd);
  } catch (error) {
    console.log(error);
  }
};



module.exports = {
  fetchEvents,
  fetchTimestampEvents
};
