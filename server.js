const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConn = require("./src/utils/db");
const PORT = 5000;

var cors = require("cors");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/members", require("./src/routes/MembersRoute"));
app.use("/dojo", require("./src/routes/DojoRoute"));

app.use((_, res) => {
  res.send({
    message: "Not found !",
  });
});

dbConn();

app.listen(5000, (req, res) => {
  console.log(`Server is listining on port ${PORT}`);
});
