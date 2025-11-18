const mongoose = require("mongoose");
const { DB_NAME } = require("../constants.js");
// import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    // console.log(connectionInstance);
    // console.log(
    //   `mongoDB connected !! DB host -> ${connectionInstance.connection.host}`
    // );
  } catch (error) {
    console.log("MONGODB connection FAILED :: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
