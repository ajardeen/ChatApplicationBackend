const mongoose = require("mongoose");
require('dotenv').config()
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database Connected`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;