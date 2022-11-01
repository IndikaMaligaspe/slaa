const DojoSchama = require("../schemas/Mongo/DojoSchema");
const AttandanceSchema = require("../schemas/Mongo/AttandanceSchema");

async function createDojo(dojoModel) {
  return new Promise(async (resolve, reject) => {
    try {
      const dojo = new DojoSchama({
        name: dojoModel.name,
        address: dojoModel.address,
        capacity: dojoModel.capacity,
        active: dojoModel.active ? dojoModel.active : false,
        schedules: dojoModel.schedules,
      });
      await dojo.save();
      dojoModel.id = dojo._id;
      resolve(dojoModel);
    } catch (err) {
      reject(err);
    }
  });
}
async function isDojoExisting(dojoName) {
  return new Promise(async (resolve) => {
    const response = await DojoSchama.isDojoExisting(dojoName);
    resolve(response);
  });
}

async function findDojoById(_id) {
  return new Promise(async (resolve) => {
    const response = await DojoSchama.findById(_id);
    resolve(response);
  });
}

async function findDojos() {
  return new Promise(async (resolve) => {
    const response = await DojoSchama.find();
    resolve(response);
  });
}

async function updateDojo(dojoModel, _id) {
  return new Promise(async (resolve) => {
    const dojo = new DojoSchama();
    const response = await dojo.updateDojo(dojoModel, _id);
    resolve(response);
  });
}

async function deleteDojo(_id) {
  return new Promise(async (resolve) => {
    const dojo = new DojoSchama();
    const response = await dojo.deleteDojo(_id);
    resolve(response);
  });
}

async function addNewSchedule(scheduleModel, _id) {
  return new Promise(async (resolve, reject) => {
    const dojo = await findDojoById(_id);
    if (!dojo) {
      reject(new Error(`Dojo for ${_id} not found!`));
      return;
    }
    dojo.schedules.push(scheduleModel);
    const response = await dojo.save();
    resolve(response);
  });
}

async function updateSchedule(scheduleModel, _id) {
  return new Promise(async (resolve, reject) => {
    const dojo = await findDojoById(_id);
    if (!dojo) {
      reject(new Error(`Dojo for ${_id} not found!`));
      return;
    }
    const response = dojo.updateSchedule(scheduleModel, scheduleModel.id);
    resolve(response);
  });
}

async function deleteSchedule(scheduleModel, _id) {
  return new Promise(async (resolve, reject) => {
    const dojo = await findDojoById(_id);
    if (!dojo) {
      reject(new Error(`Dojo for ${_id} not found!`));
      return;
    }
    const response = dojo.deleteSchedule(scheduleModel.id);
    resolve(response);
  });
}

// ---------------- Attandance ---------------
async function addAttendance(attendance, dojoId, scheduleId) {
  return new Promise(async (resolve, reject) => {
    try {
      const exists = await DojoSchama.isDojoAndScheduleExists(
        dojoId,
        scheduleId
      );
      if (!exists) {
        reject(new Error(`Dojo for ${_id} not found!`));
        return;
      }
      const attandance = new AttandanceSchema({
        dojoId: dojoId,
        scheduleId: scheduleId,
        date: attendance.date,
        members: attendance.members,
      });

      const response = await attandance.save();
      resolve(response);
    } catch (err) {
      reject(new Error(`Error saving attendacne ${err.message} !`));
    }
  });
}

async function updateAttendance(attendance, _id) {
  return new Promise(async (resolve, reject) => {
    try {
      const exists = await AttandanceSchema.isAttendanceExist(_id);
      console.log(exists);
      if (!exists) {
        resolve(false);
      }
      const attandanceSchema = new AttandanceSchema();
      const response = await attandanceSchema.updateAttandance(attendance, _id);
      resolve(response);
    } catch (err) {
      reject(new Error(`Error saving attendacne ${err.message} !`));
    }
  });
}

async function deleteAttendance(_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const attendance = await AttandanceSchema.findById(_id);
      if (!attendance) {
        resolve(false);
      }
      const response = await attendance.delete({ _id: _id });
      resolve(response);
    } catch (err) {
      reject(new Error(`Error saving attendacne ${err.message} !`));
    }
  });
}

module.exports = {
  createDojo,
  updateDojo,
  deleteDojo,
  isDojoExisting,
  findDojoById,
  findDojos,
  // ----------Schedules -------------------------
  addNewSchedule,
  updateSchedule,
  deleteSchedule,

  // ----------- Attendance ----------------------
  addAttendance,
  updateAttendance,
  deleteAttendance,
};
