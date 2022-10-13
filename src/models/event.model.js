const mongoose = require('mongoose');
const validator = require('validator');
var findOrCreate = require('mongoose-findorcreate')
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const eventSchema = mongoose.Schema(
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
eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);
eventSchema.plugin(findOrCreate);

/**
 * @typedef Events
 */
const Events = mongoose.model('Events', eventSchema);


module.exports = Events;
