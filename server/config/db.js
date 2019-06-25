const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });
    console.log("Connected MongoDB");
  } catch (error) {
    console.error(error.message);

    // Kill the process if failure
    process.exit(1);
  }
};

module.exports = connectMongoDB;
