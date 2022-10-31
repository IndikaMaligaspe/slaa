const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MembersSchema = new Schema({
  name: String,
  address: String,
  dateOfBirth: Date,
  mobile: String,
  email: String,
  dateOfJoin: Date,
  gradings: [
    {
      title: String,
      date_of_recieve: Date,
      place_of_recieve: String,
      status: Number,
    },
  ],
  dojos: [Schema.Types.ObjectId],
  isInstructor: Boolean,
});

MembersSchema.method("updateMember", async function (memberModel, _id) {
  const model = await mongoose.model("Member").findByIdAndUpdate(_id, {
    name: memberModel.name ? memberModel.name : this.name,
    address: memberModel.address ? memberModel.address : this.address,
    dateOfBirth: memberModel.dateOfBirth
      ? memberModel.dateOfBirth
      : this.dateOfBirth,
    mobile: memberModel.mobile ? memberModel.mobile : this.mobile,
    email: memberModel.email ? memberModel.email : this.email,
    dateOfJoin: memberModel.dateOfJoin
      ? memberModel.dateOfJoin
      : this.dateOfJoin,
    gradings: memberModel.gradings ? memberModel.gradings : this.gradings,
    isInstructor: memberModel.isInstructor
      ? memberModel.isInstructor
      : this.isInstructor,
  });
  return model ? true : false;
});

MembersSchema.method("deleteMember", async function (_id) {
  const model = await mongoose.model("Member").findByIdAndDelete(_id);
  return model ? true : false;
});

MembersSchema.static("isMemberExisting", async function (email, name) {
  const model = await mongoose
    .model("Member")
    .exists({ email: email, name: name });
  return model ? true : false;
});

MembersSchema.static("findBMemberyEmail", async function (email) {
  const model = await mongoose.model("Member").find({ email: email });
  return model ? true : false;
});

MembersSchema.static("findMemberByEmail", async function (email) {
  const model = await mongoose.model("Member").find({ email: email });
  return model ? true : false;
});

MembersSchema.static("findMembersByDojo", async function (dojoId) {
  const model = await mongoose
    .model("Member")
    .find()
    .elemMatch("dojo", { _id: dojoId });
  return model ? true : false;
});

MembersSchema.static("findMembersByGradig", async function (title) {
  const model = await mongoose
    .model("Member")
    .find()
    .elemMatch("gradings", { title: title });
  return model ? true : false;
});

module.exports = mongoose.model("Member", MembersSchema);
