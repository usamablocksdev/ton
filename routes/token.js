const { Token, validateToken } = require("../models/token");
const express = require("express");
const router = express.Router();

router.post("/token", async (req, res) => {
  const { error } = validateToken(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let token = new Token({
      token_name: req.body.token_name,
      token_symbol: req.body.token_symbol,
      token_image: req.body.token_image,
      token_address: req.body.token_address,
      created_by: req.body.created_by,
      twitter: req.body.twitter ?? "",
      telegram: req.body.telegram ?? "",
      website: req.body.website ?? "",
    });

    token = await token.save();
    return res.json(token);
  } catch (e) {
    res.send(e);
  }
});

router.get("/tokens", async (req, res) => {
  try {
    let token = await Token.find();
    return res.json(token);
  } catch (e) {
    res.send(e);
  }
});

router.get("/getToken/:token", async (req, res) => {
  try {
    let token = await Token.findOne({
      token_address: req.params.token,
    });
    return res.json(token);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/deleteToken", async (req, res) => {
  try {
    let token = await Token.findOneAndDelete({
      token_address: req.body.token_address,
    });

    if (!token) return res.status(404).send("Token not found.");

    return res.json(token);
  } catch (e) {
    res.send(e);
  }
});

router.put("/token/:id", async (req, res) => {
  const { error } = validateToken(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const token = await Token.findByIdAndUpdate(
      req.params.id,
      {
        token_name: req.body.token_name,
        token_symbol: req.body.token_symbol,
        token_image: req.body.token_image,
        token_address: req.body.token_address,
        created_by: req.body.created_by,
        twitter: req.body.twitter,
        telegram: req.body.telegram,
        website: req.body.website,
      },
      { new: true }
    );

    if (!token) return res.status(404).send("Token not found.");

    return res.json(token);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
module.exports = router;
