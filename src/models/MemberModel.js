class MemberModel {
  constructor(
    id,
    name,
    address,
    dateOfBirth,
    mobile,
    email,
    dateOfJoin,
    gradings,
    isInstructor
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.dateOfBirth = dateOfBirth;
    this.mobile = mobile;
    this.email = email;
    this.dateOfJoin = dateOfJoin;
    this.gradings = gradings;
    this.isInstructor = isInstructor;
  }
}

module.exports = MemberModel;
