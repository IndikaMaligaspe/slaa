const {
  createDojo,
  updateDojo,
  deleteDojo,
  isDojoExisting,
  findDojoById,
  findDojos,
  // ----------Schedules ------------
  addNewSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../services/DojoService");

async function getDojoById(_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const dojo = await findDojoById(_id);
      if (dojo) resolve(dojo);
      else resolve(null);
    } catch (err) {
      reject(err);
    }
  });
}

async function getAllDojos() {
  return new Promise(async (resolve, reject) => {
    try {
      const dojos = await findDojos();
      if (dojos) resolve(dojos);
      else resolve(null);
    } catch (err) {
      reject(err);
    }
  });
}

async function createNewDojo(dojoModel) {
  return new Promise(async (resolve, reject) => {
    try {
      const dojoAvailable = await isDojoExisting(dojoModel.name);
      if (dojoAvailable) {
        const newDojo = await createDojo(dojoModel);
        resolve(newDojo);
      } else {
        reject(
          new Error(`Dojo with same name : ${dojoModel.name} is available`)
        );
      }
    } catch (err) {
      reject(err);
    }
  });
}

async function updateExistingDojo(dojoModel, _id) {
  return new Promise(async (resolve, reject) => {
    try {
      const dojo = await findDojoById(_id);
      if (dojo) {
        const updatedDojo = await updateDojo(dojoModel, _id);
        resolve(updateDojo);
      } else {
        reject(new Error(`Dojo with id: ${_id} does not exist!`));
      }
    } catch (err) {
      reject(`Error in updating Dojo : ${err} !`);
    }
  });
}

async function deleteExistingDojo(_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const dojo = await findDojoById(_id);
      if (dojo) {
        const deletedDojo = await deleteDojo(_id);
        resolve(deletedDojo);
      } else {
        reject(new Error(`Dojo with id: ${_id} does not exist!`));
      }
    } catch (err) {
      reject(`Error in deleting Dojo : ${err} !`);
    }
  });
}

async function addNewScheduleToDojo(scheduleModels, _id) {
  return new Promise(async (resolve, reject) => {
    try {
      let updatedSchedules = new Array();
      const dojo = await findDojoById(_id);
      if (dojo) {
        scheduleModels.forEach((_schedule) => {
          addNewSchedule(_schedule, dojo).then((updatedSchedule) => {
            updatedSchedules.push(updatedSchedule);
          });
        });
        resolve(updatedSchedules);
      } else {
        reject(new Error(`Dojo with id: ${_id} does not exist!`));
      }
    } catch (err) {
      reject(`Error in adding new Schedules : ${err} !`);
    }
  });
}

async function updateScheduleToDojo(scheduleModels, _id) {
  return new Promise(async (resolve, reject) => {
    try {
      let updatedSchedules = new Array();
      const dojo = await findDojoById(_id);
      if (dojo) {
        scheduleModels.forEach((_schedule) => {
          updateSchedule(_schedule, dojo).then((updatedSchedule) => {
            updatedSchedules.push(updatedSchedule);
          });
        });
        resolve(updatedSchedules);
      } else {
        reject(new Error(`Dojo with id: ${_id} does not exist!`));
      }
    } catch (err) {
      reject(`Error in updating  Schedules : ${err} !`);
    }
  });
}

async function deleteScheduleInDojo(scheduleModels, _id) {
  return new Promise(async (resolve, reject) => {
    try {
      let deletedSchedules = new Array();
      const dojo = await findDojoById(_id);
      if (dojo) {
        scheduleModels.forEach((_schedule) => {
          deleteSchedule(_schedule, dojo).then((deletedSchedule) => {
            deletedSchedules.push(deletedSchedule);
          });
        });
        resolve(deletedSchedules);
      } else {
        reject(new Error(`Dojo with id: ${_id} does not exist!`));
      }
    } catch (err) {
      reject(`Error in updating  Schedules : ${err} !`);
    }
  });
}

module.exports = {
  createNewDojo,
  updateExistingDojo,
  deleteExistingDojo,
  getAllDojos,
  getDojoById,
  // -----------Schedules ------------
  addNewScheduleToDojo,
  updateScheduleToDojo,
  deleteScheduleInDojo,
};