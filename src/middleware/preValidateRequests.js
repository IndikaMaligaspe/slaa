const mongoose = require("mongoose");
const validateRequest = (req, res, next) => {
  try {
    if (req.params.id) mongoose.Types.ObjectId(req.params.id.trim());
  } catch (err) {
    res.status(400).send(err.message);
    return;
  }
  next();
};

module.exports = validateRequest;
