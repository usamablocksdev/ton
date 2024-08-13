const mongoose = require("mongoose");
const Joi = require("joi");

const tokenSchema = new mongoose.Schema({
  token_name: {
    type: String,
  },
  token_symbol: {
    type: String,
  },
  token_image: {
    type: String,
  },
  token_address: {
    type: String,
    unique: true,
  },
  created_by: {
    type: String,
  },
  twitter: {
    type: String,
  },
  telegram: {
    type: String,
  },
  website: {
    type: String,
  },
  is_blocked: {
    type: Boolean,
    default: false,
  },
});

const Token = mongoose.model("Token", tokenSchema);

function validateToken(token) {
  const schema = {
    token_name: Joi.required(),
    token_symbol: Joi.required(),
    token_image: Joi.required(),
    token_address: Joi.required(),
    created_by: Joi.required(),
    twitter: Joi.string().allow(""),
    telegram: Joi.string().allow(""),
    website: Joi.string().allow(""),
  };
  return Joi.validate(token, schema);
}

module.exports.Token = Token;
module.exports.validateToken = validateToken;
