const {
  isMemberExisting,
  createNewMember,
  findMemberById,
  updateExistingMemeber,
  deleteExistingMember,
  findMembers,
} = require("../services/MemberService");

async function getMemberById(_id) {
  return new Promise((resolve, reject) => {
    findMemberById(_id)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
}

async function getAllMembers() {
  return new Promise((resolve, reject) => {
    findMembers()
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
}

async function createMember(memberModel) {
  return new Promise((resolve, reject) => {
    isMemberExisting(memberModel.email, memberModel.name).then((response) => {
      if (!response) {
        createNewMember(memberModel).then((newMember) => {
          resolve(newMember);
        });
      } else {
        reject(new Error(`Membr with ${memberModel.email} already existing !`));
      }
    });
  });
}

async function updateMember(memberModel, _id) {
  return new Promise((resolve, reject) => {
    findMemberById(_id)
      .then((member) => {
        if (member) {
          updateExistingMemeber(memberModel, _id)
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              reject(new Error(`Error in updating ${err} !`));
            });
        } else {
          reject(new Error(`Membr with ${memberModel.email} does not exist !`));
        }
      })
      .catch((err) => {
        reject(new Error(`Error in updating ${err} !`));
      });
  });
}

async function deleteMember(_id) {
  return new Promise((resolve, reject) => {
    findMemberById(_id)
      .then((member) => {
        if (member) {
          deleteExistingMember(_id)
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              reject(new Error(`Error in deleting member : ${err.message} !`));
            });
        } else {
          reject(new Error(`Membr with ${_id} does not exist !`));
        }
      })
      .catch((err) => {
        reject(new Error(`Error in updating ${err.message} !`));
      });
  });
}
module.exports = {
  createMember,
  updateMember,
  deleteMember,
  getMemberById,
  getAllMembers,
};
