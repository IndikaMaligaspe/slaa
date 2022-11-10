const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");

const memberSchema = require("../schemas/Mongo/MemberSchema");
const MemberModel = require("../models/MemberModel");
const { members } = require("../../data/members");
const MemberSchema = require("../schemas/Mongo/MemberSchema");

let memberController = rewire("../controllers/MemberController");

let savedMember;

let memberServiceMock = {
  findMemberById: function (_id) {
    return new Promise((resolve) => {
      const m = members.find((m) => {
        return m.id == _id;
      });
      if (m) resolve(m);
      else resolve(false);
    });
  },
  findMembers: function () {
    return new Promise((resolve) => {
      resolve(members);
    });
  },
  isMemberExisting: function (email, name) {
    return new Promise((resolve) => {
      const m = members.find((m) => {
        return m.email == email && m.name == name;
      });
      if (m) resolve(true);
      else resolve(false);
    });
  },
  createNewMember: function (memberModel) {
    return new Promise((resolve) => {
      savedMember = new MemberSchema({
        name: memberModel.name,
        address: memberModel.address,
        dateOfBirth: memberModel.dateOfBirth,
        mobile: memberModel.mobile,
        dateOfJoin: memberModel.dateOfJoin,
        gradings: memberModel.gradings,
        isInstructor: memberModel.isInstructor,
      });
      resolve(savedMember);
    });
  },
  updateExistingMemeber: function (memberModel, _id) {
    return new Promise((resolve) => {
      savedMember = new MemberSchema({
        name: memberModel.name,
        address: memberModel.address,
        dateOfBirth: memberModel.dateOfBirth,
        mobile: memberModel.mobile,
        email: memberModel.email,
        dateOfJoin: memberModel.dateOfJoin,
        gradings: memberModel.gradings,
        isInstructor: memberModel.isInstructor,
      });
      resolve(savedMember);
    });
  },
  deleteExistingMember: function (_id) {
    return new Promise((resolve) => {
      resolve(true);
    });
  },
};

memberController.__set__("findMemberById", memberServiceMock.findMemberById);
memberController.__set__("findMembers", memberServiceMock.findMembers);
memberController.__set__(
  "isMemberExisting",
  memberServiceMock.isMemberExisting
);
memberController.__set__("createNewMember", memberServiceMock.createNewMember);
memberController.__set__(
  "updateExistingMemeber",
  memberServiceMock.updateExistingMemeber
);
memberController.__set__(
  "deleteExistingMember",
  memberServiceMock.deleteExistingMember
);

describe("members /", () => {
  describe("get member with specific ID /id", () => {
    it("get member by id 1 should give a Member from list", async () => {
      try {
        let _id = 1;
        const actualResult = await memberController.getMemberById(_id);
        expect(actualResult.name).to.equal("Ajith G");
      } catch (err) {
        console.log(err);
      }
    });
    it("get false when member  is not available", async () => {
      try {
        let _id = 5;
        const actualResult = await memberController.getMemberById(_id);
        expect(actualResult).to.equal(false);
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe("get all members", () => {
    it("get members ", async () => {
      let find;
      try {
        const actualResult = await memberController.getAllMembers();
        expect(actualResult.length).to.greaterThan(1);
        expect(actualResult[0].name).to.equal("Ajith G");
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe("create a new member", () => {
    it("create a new member with correct data and member not existing", async () => {
      try {
        // given
        let member = new MemberModel(
          null,
          "Indika",
          "indika123@kkk.lk",
          "Test Address",
          "1977-10-10",
          "999999",
          "2002-10-10",
          [],
          true
        );

        // When
        const actualResult = await memberController.createMember(member);

        // Then
        expect(actualResult.id).is.not.null;
        expect(actualResult.name).to.equal(savedMember.name);
      } catch (err) {
        console.log(err);
      }
    });
    it("Error when trying to create a newmember with existing email and name", async () => {
      try {
        // given
        let member = new MemberModel(
          null,
          "Ajith G",
          "Test Address",
          "1977-10-10",
          "999999",
          "ajith_111@gmail.com",
          "2002-10-10",
          [],
          true
        );

        // When
        let error;
        let actualResult;
        try {
          actualResult = await memberController.createMember(member);
        } catch (err) {
          error = err.message;
        }

        // Then
        expect(error).is.equal(`Membr with ${member.email} already existing !`);
        expect(actualResult).is.equal(undefined);
      } catch (err) {
        console.log(err);
      }
    });
  });
  describe("update an existing member", () => {
    it("update a new member with correct data when member existing", async () => {
      try {
        // given
        let member = new MemberModel(
          null,
          "Indika",
          "Test Address",
          "1977-10-10",
          "999999",
          "indika123@kkk.lk",
          "2002-10-10",
          [],
          true
        );

        // When
        const actualResult = await memberController.updateMember(member, 1);

        // Then
        expect(actualResult.id).is.not.null;
        expect(actualResult.name).to.equal(savedMember.name);
      } catch (err) {
        console.log(err);
      }
    });
    it("Error when trying to update a member with correct data when member not existing", async () => {
      try {
        // given
        let member = new MemberModel(
          null,
          "Indika",
          "Test Address",
          "1977-10-10",
          "999999",
          "indika123@kkk.lk",
          "2002-10-10",
          [],
          true
        );

        // When
        let error;
        let actualResult;
        try {
          actualResult = await memberController.updateMember(member, 10);
        } catch (err) {
          error = err.message;
        }

        // Then
        expect(error).is.equal(`Membr with ${member.email} does not exist !`);
        expect(actualResult).is.equal(undefined);
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe("delete an existing member", () => {
    it("delete a member with correct data when member existing", async () => {
      try {
        // given
        let _id = 1;

        // When
        const actualResult = await memberController.deleteMember(_id);

        // Then
        expect(actualResult).is.equal(true);
      } catch (err) {
        console.log(err);
      }
    });
    it("Error when trying to delete a member with correct data when member not existing", async () => {
      try {
        // given
        let id = 10;

        // When
        let error;
        let actualResult;
        try {
          actualResult = await memberController.deleteMember(id);
        } catch (err) {
          error = err.message;
        }

        // Then
        expect(error).is.equal(`Membr with ${id} does not exist !`);
      } catch (err) {
        console.log(err);
      }
    });
  });
});
