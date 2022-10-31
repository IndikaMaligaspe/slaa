const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  password: String,
  member: [
    {
      type: Schema.Types.ObjectId,
      ref: "Members",
    },
  ],
});

const userModel = mongoose.model("User", UserSchema);

modules.export = { userModel };
