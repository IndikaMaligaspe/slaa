const mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1/slaa";
function mongooseConnection() {
  mongoose.connect(
    mongoDB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log(`Connected to  - ${mongoDB}`);
    }
  );

  // Get the default connection
  const dbConnection = mongoose.connection;

  // Bind connection to error event (to get notification of connection errors)
  dbConnection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );

  dbConnection.once("open", () => console.log("Connected to DB!"));
}

module.exports = mongooseConnection;
