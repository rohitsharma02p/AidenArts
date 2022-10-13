
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const { Events } = require("../models");
//
const Web3 = require("web3");
var abi = require("../contractAbis/smartcontract.json");
const contractAddress = "0xA89f682AFCaffcDFf88644722a6BDBbf53FbaFF7";
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
  
  const mapedEvent = event.map((eventObj) => {
    return {
      event: eventObj.event,
      transactionHash: eventObj.transactionHash,
      timestamp: eventObj.returnValues.timestamp
    };
  });
  const timestamp = mapedEvent[0];

  try {
    await Events.create(timestamp);
  } catch (error) {
   console.log("DB Error While Saving Past Events")
  }
}
const fetchTimestampEvents = async () => {

    Events.deleteMany( function () {});
  try {
    const FirstRoundStart = await contract.getPastEvents("FirstRoundStart", {
      fromBlock: "28580252",
      toBlock: "28580252"
    });
    mapfunction(FirstRoundStart);
    const FirstRoundEnd = await contract.getPastEvents("FirstRoundEnd", {
      fromBlock: "28580252",
      toBlock: "28580252"
    });
    mapfunction(FirstRoundEnd);
    const SeconDroundEnd = await contract.getPastEvents("SeconDroundEnd", {
      fromBlock: "28580252",
      toBlock: "28580252"
    });
    mapfunction(SeconDroundEnd);
    const ThirdRoundEnd = await contract.getPastEvents("ThirdRoundEnd", {
      fromBlock: "28580252",
      toBlock: "28580252"
    });
    mapfunction(ThirdRoundEnd);
  } catch (error) {
    console.log(error);
  }
};

//  DB Operations

module.exports = {
  fetchEvents,
  fetchTimestampEvents
};
