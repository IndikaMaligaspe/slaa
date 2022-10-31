const {
  createMember,
  updateMember,
  deleteMember,
  getMemberById,
  getAllMembers,
} = require("../controllers/MemberController");

const validateRequest = require("../middleware/preValidateRequests");

const MemberModel = require("../models/MemberModel");

const express = require("express"),
  router = express.Router();

router.get("/:id", validateRequest, (req, res) => {
  const _id = req.params.id;
  getMemberById(_id)
    .then((response) => {
      if (response) res.jsonp(response);
      else res.send(404);
    })
    .catch((err) => {
      res.send(500, err);
    });
});

router.get("/", (req, res) => {
  getAllMembers()
    .then((response) => {
      if (response) res.jsonp(response);
      else res.send(404);
    })
    .catch((err) => {
      res.send(500, err);
    });
});

router.post("/", async (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }
  const member = new MemberModel(
    null,
    req.body.name,
    req.body.address,
    req.body.dateOfBirth,
    req.body.mobile,
    req.body.email,
    req.body.dateOfJoin,
    req.body.gradings,
    req.body.isInstructor
  );
  createMember(member)
    .then((response) => {
      res.jsonp(response);
    })
    .catch((err) => {
      res.send(500, err.message);
    });
});

router.put("/:id", validateRequest, async (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }
  const _id = req.params.id;
  const member = new MemberModel(
    null,
    req.body.name,
    req.body.address,
    req.body.dateOfBirth,
    req.body.mobile,
    req.body.email,
    req.body.dateOfJoin,
    req.body.gradings,
    req.body.isInstructor
  );
  updateMember(member, _id)
    .then((response) => {
      res.jsonp(response);
    })
    .catch((err) => {
      res.send(500, err.message);
    });
});

router.delete("/:id", validateRequest, async (req, res) => {
  const id = req.params.id;
  deleteMember(id)
    .then((response) => {
      res.jsonp(response);
    })
    .catch((err) => {
      res.send(500, err.message);
    });
});
module.exports = router;
