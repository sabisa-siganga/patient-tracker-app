// importing mongoose
const mongoose = require("mongoose");

// Loading environment variables from a .env file into the process.env object
require("dotenv").config();

// connecting to mongo database
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.CONNECTURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connectToDatabase };
