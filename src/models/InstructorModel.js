class InstructorModel {
  constructor(id, memberId, dajoIds, schedules) {
    this.is = id;
    this.memberId = memberId;
    this.dajoIds = dajoIds; // Array of dojo ids
    this.schedules = schedules; // Array of schedule ids
  }
}
