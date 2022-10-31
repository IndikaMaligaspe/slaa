const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DojoSchema = new Schema({
  name: String,
  address: String,
  capacity: Number,
  active: Boolean,
  schedules: [
    {
      day: String,
      start_time: String,
      end_time: String,
      count: Number,
      active: Boolean,
    },
  ],
});

DojoSchema.method("updateDojo", async function (dojoModel, _id) {
  const model = await mongoose.model("Dojo").findById(_id, {
    name: dojoModel.name ? dojoModel.name : this.name,
    address: dojoModel.address ? dojoModel.address : this.address,
    capacity: dojoModel.capacity ? dojoModel.capacity : this.capacity,
    active: dojoModel.active ? dojoModel.active : this.active,
    schedules:
      dojoModel.schedules.length > 0 ? dojoModel.schedules : this.schedules,
  });
  return model ? true : false;
});

DojoSchema.method("deleteDojo", async function (_id) {
  const model = await mongoose.model("Dojo").findByIdAndDelete(_id);
  return model ? true : false;
});

DojoSchema.method("deleteSchedule", async function (_id) {
  const schedule = this.schedules.find((sc) => {
    return sc._id.toString() == _id;
  });
  if (schedule) {
    this.schedules.id(schedule._id).remove();
    this.save();
    return true;
  }
  return false;
});

DojoSchema.method("updateSchedule", async function (scheduleModel, _id) {
  const schedule = this.schedules.find((sc) => {
    return sc._id.toString() == scheduleModel.id;
  });

  if (schedule) {
    schedule.day = scheduleModel.day ? scheduleModel.day : schedule.day;
    schedule.start_time = scheduleModel.startTime
      ? scheduleModel.startTime
      : schedule.start_time;
    schedule.end_time = scheduleModel.endTime
      ? scheduleModel.endTime
      : schedule.end_time;
    schedule.count = scheduleModel.count ? scheduleModel.count : schedule.count;
    schedule.active = scheduleModel.active
      ? scheduleModel.active
      : schedule.active;
  }
  const response = this.save();
  return response;
});

DojoSchema.static("isDojoExisting", async function (dojoName) {
  const model = await mongoose.model("Dojo").find({ name: dojoName });
  return model ? true : false;
});

DojoSchema.static("findDojoByName", async function (dojoName) {
  const model = await mongoose.model("Dojo").find({ name: dojoName });
  return model;
});

module.exports = mongoose.model("Dojo", DojoSchema);
