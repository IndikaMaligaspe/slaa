const {
  createNewDojo,
  deleteExistingDojo,
  getAllDojos,
  getDojoById,
  updateExistingDojo,
  //   -----------Schedules ----------------
  addNewScheduleToDojo,
  updateScheduleToDojo,
  deleteScheduleInDojo,
  // ----------Attendance-------------------
  addNewAttendance,
} = require("../controllers/DojoContoroller");
const validateRequest = require("../middleware/preValidateRequests");

const {
  DojoModel,
  ScheduleModel,
  AttendanceModel,
} = require("../models/DojoModel");

const express = require("express"),
  router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dojos = await getAllDojos();
    res.jsonp(dojos);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", validateRequest, async (req, res) => {
  try {
    const _id = req.params.id;
    const dojo = await getDojoById(_id);
    if (dojo) res.jsonp(dojos);
    else res.status(404).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const dojo = new DojoModel(
    null,
    req.body.name,
    req.body.address,
    req.body.capacity,
    req.body.active,
    req.body.schedules
  );

  try {
    const newDojo = await createNewDojo(dojo);
    res.status(201).jsonp(newDojo);
  } catch (err) {
    res.send(500, err.message);
  }
});

router.put("/:id", validateRequest, async (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }
  const _id = req.params.id;

  const dojo = new DojoModel(
    null,
    req.body.name,
    req.body.address,
    req.body.capacity,
    req.body.active,
    req.body.schedules
  );

  try {
    const updatedDojo = await updateExistingDojo(dojo, _id);
    res.jsonp(updatedDojo);
  } catch (err) {
    res.send(500, err.message);
  }
});

router.delete("/:id", validateRequest, async (req, res) => {
  const id = req.params.id;
  deleteExistingDojo(id)
    .then((response) => {
      res.jsonp(response);
    })
    .catch((err) => {
      res.send(500, err.message);
    });
});

router.delete("/:id", validateRequest, async (req, res) => {
  const id = req.params.id;
  deleteExistingDojo(id)
    .then((response) => {
      res.jsonp(response);
    })
    .catch((err) => {
      res.send(500, err.message);
    });
});

// -----------------------------Schedules --------------------
router.post("/:id/schedules", validateRequest, async (req, res) => {
  if (!req.body) {
    res.status(400).send();
    return;
  }
  const _id = req.params.id;
  const reqSchedules = req.body.schedules;

  let schedules = new Array();
  reqSchedules.forEach((_schedule) => {
    const schedule = new ScheduleModel(
      null,
      _schedule.day,
      _schedule.sartTime,
      _schedule.endTime,
      _schedule.count,
      _schedule.active
    );
    schedules.push(schedule);
  });

  try {
    const updatedSchedule = await addNewScheduleToDojo(schedules, _id);
    res.status(201).jsonp(updatedSchedule);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id/schedules", validateRequest, async (req, res) => {
  if (!req.body) {
    res.status(400).send();
    return;
  }
  const _id = req.params.id;
  const reqSchedules = req.body.schedules;

  let schedules = new Array();
  reqSchedules.forEach((_schedule) => {
    const schedule = new ScheduleModel(
      _schedule.id,
      _schedule.day,
      _schedule.startTime,
      _schedule.endTime,
      _schedule.count,
      _schedule.active
    );
    schedules.push(schedule);
  });

  try {
    const updatedSchedule = await updateScheduleToDojo(schedules, _id);
    res.jsonp(updatedSchedule);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id/schedules", validateRequest, async (req, res) => {
  const _id = req.params.id;
  const reqSchedules = req.body.schedules;

  let schedules = new Array();
  reqSchedules.forEach((_schedule) => {
    const schedule = new ScheduleModel(
      _schedule.id,
      _schedule.day,
      _schedule.startTime,
      _schedule.endTime,
      _schedule.count,
      _schedule.active
    );
    schedules.push(schedule);
  });

  try {
    const deletedSchedule = await deleteScheduleInDojo(schedules, _id);
    res.jsonp(deletedSchedule);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// -------------------Attendance ------------------------------

router.post(
  "/:dojo/schedules/:schedule/attendance",
  validateRequest,
  async (req, res) => {
    if (!req.body) {
      res.status(400).send();
      return;
    }
    const _dojo = req.params.dojo;
    const _schedule = req.params.schedule;
    const reqAttendance = req.body.attendance;

    let attendance = new Array();
    reqAttendance.forEach((_att) => {
      const att = new AttendanceModel(
        null,
        _dojo,
        _schedule,
        _att.date,
        _att.members
      );
      attendance.push(att);
    });

    try {
      const status = await addNewAttendance(attendance, _dojo, _schedule);
      res.status(201).jsonp(status);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.put("/:id/schedules", validateRequest, async (req, res) => {
  if (!req.body) {
    res.status(400).send();
    return;
  }
  const _id = req.params.id;
  const reqSchedules = req.body.schedules;

  let schedules = new Array();
  reqSchedules.forEach((_schedule) => {
    const schedule = new ScheduleModel(
      _schedule.id,
      _schedule.day,
      _schedule.startTime,
      _schedule.endTime,
      _schedule.count,
      _schedule.active
    );
    schedules.push(schedule);
  });

  try {
    const updatedSchedule = await updateScheduleToDojo(schedules, _id);
    res.jsonp(updatedSchedule);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id/schedules", validateRequest, async (req, res) => {
  const _id = req.params.id;
  const reqSchedules = req.body.schedules;

  let schedules = new Array();
  reqSchedules.forEach((_schedule) => {
    const schedule = new ScheduleModel(
      _schedule.id,
      _schedule.day,
      _schedule.startTime,
      _schedule.endTime,
      _schedule.count,
      _schedule.active
    );
    schedules.push(schedule);
  });

  try {
    const deletedSchedule = await deleteScheduleInDojo(schedules, _id);
    res.jsonp(deletedSchedule);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
