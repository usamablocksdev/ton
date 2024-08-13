const { Tx, validateTx } = require("../models/tx");
const express = require("express");
const router = express.Router();

router.post("/tx", async (req, res) => {
  const { error } = validateTx(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let tx = new Tx({
      from_token: req.body.from_token,
      to_token: req.body.to_token,
      send_amount: req.body.send_amount,
      receive_amount: req.body.receive_amount,
      wallet: req.body.wallet,
    });

    tx = await tx.save();
    return res.json(tx);
  } catch (e) {
    res.send(e);
  }
});

router.get("/txs", async (req, res) => {
  try {
    let tx = await Tx.find({
      from_token: req.body.token,
    });
    return res.json(tx);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
