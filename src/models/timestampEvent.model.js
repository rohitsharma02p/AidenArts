const mongoose = require('mongoose');
const validator = require('validator');
var findOrCreate = require('mongoose-findorcreate')
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const timestampeventSchema = mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
     
    },
    transactionHash: {
      type: String,
      required: true,
      
     
    },
    timestamp: {
      type: String,
      required: true,
     
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
timestampeventSchema.plugin(toJSON);
timestampeventSchema.plugin(paginate);
timestampeventSchema.plugin(findOrCreate);

/**
 * @typedef Events
 */
const TimeStampEvent = mongoose.model('TimeStampEvent', timestampeventSchema);


module.exports = TimeStampEvent;
