const mongoose = require("mongoose");
const config = require("config");
module.exports = async () => {
  try {
    await mongoose.connect(config.get("dbUri"), {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
