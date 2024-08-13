const mongoose = require("mongoose");
const Joi = require("joi");

const txSchema = new mongoose.Schema({
  from_token: {
    type: String,
  },
  to_token: {
    type: String,
  },
  send_amount: {
    type: String,
  },
  receive_amount: {
    type: String,
  },
  wallet: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

const Tx = mongoose.model("Tx", txSchema);

function validateTx(user) {
  const schema = {
    from_token: Joi.required(),
    to_token: Joi.required(),
    send_amount: Joi.required(),
    receive_amount: Joi.string().allow(""),
    wallet: Joi.required(),
  };
  return Joi.validate(user, schema);
}

module.exports.Tx = Tx;
module.exports.validateTx = validateTx;
