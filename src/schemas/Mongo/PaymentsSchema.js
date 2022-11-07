const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  ledger_id: Number,
  date: Date,
  amount: Number,
  currency: String,
  type: String,
  payement_type: String,
  payee_id: mongoose.SchemaTypes.ObjectId,
  dojo_id: mongoose.SchemaTypes.ObjectId,
});

PaymentSchema.static("getSQLedgerId", async function () {
  const model = await mongoose
    .model("PaymentLedger")
    .find()
    .sort({ $natural: -1 })
    .limit(1);
  return model;
});

PaymentSchema.static("findPaymentsByDate", async function (_date) {
  const model = await mongoose.model("Payment").find({ date: _date });
  return model;
});

PaymentSchema.static("findPaymentByLedgerId", async function (ledgerId) {
  const model = await mongoose.model("Payment").find({ ledger_id: ledgerId });
  return model;
});

PaymentSchema.static("findPaymentsByPayee", async function (payeeId) {
  const model = await mongoose.model("Payment").find({ payee_id: payeeId });
  return model;
});

PaymentSchema.static("findPaymentsByDojo", async function (dojoId) {
  const model = await mongoose.model("Payment").find({ dojo_id: dojoId });
  return model;
});

modules.export = mongoose.model("Payment", PaymentSchema);
