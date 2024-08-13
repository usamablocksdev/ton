const express = require("express");
const app = express();
const xmlparser = require("express-xml-bodyparser");
const cors = require("cors");
const tx = require("./routes/tx");
const token = require("./routes/token");
const port = 4000;

require("./mongoDB")();

app.use(xmlparser());
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use("/", tx);
app.use("/", token);

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
});
