require("dotenv").config();
const connectDB = require("./db/index.js");
const app = require("./app.js");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("mongoDB connection failed !!! ", error);
  });
