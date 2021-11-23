const mongoose = require("mongoose");
const config = require("config");

const mongoDbUrl = process.env.mongoDbURL || config.get("db");

if (!mongoDbUrl) {
  console.log("[FATAL ERROR]: No Database String Detected.");
  process.exit(1);
}

module.exports = async function () {
  try {
    await mongoose.connect(mongoDbUrl);
    console.log("[CONNECTED TO DATABASE]");
  } catch (err) {
    console.log(err.message);
  }
};
