const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttandanceSchema = new Schema({
  dojoId: mongoose.SchemaTypes.ObjectId,
  scheduleId: mongoose.SchemaTypes.ObjectId,
  date: Date,
  members: [mongoose.SchemaTypes.ObjectId],
});

AttandanceSchema.method(
  "updateAttandance",
  async function (attendanceModal, _id) {
    const model = await mongoose
      .model("Attandance")
      .find({ _id: mongoose.Types.ObjectId(_id) });
    if (model) {
      this.dojoId = attendanceModal.dojo ? attendanceModal.dojo : this.dojoId;
      this.scheduleId = attendanceModal.schedule
        ? attendanceModal.schedule
        : this.scheduleId;
      this.date = attendanceModal.date ? attendanceModal.date : this.date;
      this.members = attendanceModal.members
        ? attendanceModal.members
        : this.members;
    } else {
      return false;
    }
    const response = await this.save();
    return response;
  }
);

AttandanceSchema.static("isAttendanceExist", async function (_id) {
  const model = await mongoose
    .model("Attandance")
    .find({ _id: mongoose.Types.ObjectId(_id) });
  return model ? true : false;
});
module.exports = mongoose.model("Attandance", AttandanceSchema);
