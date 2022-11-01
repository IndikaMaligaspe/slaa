const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttandanceSchema = new Schema({
  dojoId: mongoose.SchemaTypes.ObjectId,
  scheduleId: mongoose.SchemaTypes.ObjectId,
  date: Date,
  members: [mongoose.SchemaTypes.ObjectId],
});

module.exports = mongoose.model("Attandance", AttandanceSchema);
