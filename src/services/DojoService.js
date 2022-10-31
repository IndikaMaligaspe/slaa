const { DojoModel } = require("../models/DojoModel");
const DojoSchama = require("../schemas/Mongo/DojoSchama");

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
};
