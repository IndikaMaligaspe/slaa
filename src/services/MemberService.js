const MemberSchema = require("../schemas/Mongo/MemberSchema");

function createNewMember(memberModel) {
  return new Promise(async (resolve) => {
    const member = new MemberSchema({
      name: memberModel.name,
      address: memberModel.address,
      dateOfBirth: memberModel.dateOfBirth,
      mobile: memberModel.mobile,
      email: memberModel.email,
      dateOfJoin: memberModel.dateOfJoin,
      gradings: memberModel.gradings,
      isInstructor: memberModel.isInstructor,
    });
    await member.save();
    memberModel.id = member._id;
    resolve(memberModel);
  });
}

async function isMemberExisting(email, name) {
  return new Promise(async (resolve) => {
    const response = await MemberSchema.isMemberExisting(email, name);
    resolve(response);
  });
}

async function findMemberById(_id) {
  return new Promise(async (resolve) => {
    const response = await MemberSchema.findById(_id);
    if (response) resolve(response);
    else resolve(false);
  });
}

async function findMembers() {
  return new Promise(async (resolve) => {
    const response = await MemberSchema.find();
    resolve(response);
  });
}

async function updateExistingMemeber(memberModel, _id) {
  return new Promise(async (resolve) => {
    const member = new MemberSchema();
    const response = await member.updateMember(memberModel, _id);
    resolve(response);
  });
}

async function deleteExistingMember(_id) {
  return new Promise(async (resolve) => {
    const member = new MemberSchema();
    const response = await member.deleteMember(_id);
    resolve(response);
  });
}

module.exports = {
  createNewMember,
  isMemberExisting,
  findMemberById,
  updateExistingMemeber,
  deleteExistingMember,
  findMembers,
};
