class DojoModel {
  constructor(id, name, address, capacity, active, schedules) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.capacity = capacity;
    this.active = active;
    this.schedules = schedules;
  }
}

class ScheduleModel {
  constructor(id, day, startTime, endTime, count, active) {
    this.id = id;
    this.day = day;
    this.startTime = startTime;
    this.endTime = endTime;
    this.count = count;
    this.active = active;
  }
}

class AttendanceModel {
  constructor(id, dojo, schedule, date, members) {
    this.id = id;
    this.dojo = dojo;
    this.schedule = schedule;
    this.date = date;
    this.members = members;
  }
}

module.exports = { DojoModel, ScheduleModel, AttendanceModel };
