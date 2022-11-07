const PaymentSchema = require("../schemas/Mongo/PaymentSchema");

async function createPayment(paymentModel) {
  return new Promise(async (resolve, reject) => {
    try {
      const payment = new PaymentSchema({
        ledgerId: paymentModel.ledgerId,
        date: paymentModel.date,
        amount: paymentModel.amount,
        currency: paymentModel.currency,
        payementType: paymentModel.payementType,
        payeeId: paymentModel.payeeId,
        dojoId: paymentModel.dojoId,
      });
      await payment.createPayment();
      paymentModel.id = payment._id;
      paymentModel.ledgerId = payment.ledgerId;
      resolve(payment);
    } catch (err) {
      reject(err);
    }
  });
}

async function findPaymentByLedgerId(ledgerId) {
  return new Promise(async (resolve) => {
    const response = await PaymentSchema.findPaymentByLedgerId(ledgerId);
    resolve(response);
  });
}

async function findPaymentsByDate(date) {
  return new Promise(async (resolve) => {
    const response = await PaymentSchema.findPaymentsByDate(date);
    resolve(response);
  });
}

async function findPaymentsByDojo(dojo) {
  return new Promise(async (resolve) => {
    const response = await PaymentSchema.findPaymentsByDojo(dojo);
    resolve(response);
  });
}

async function findPaymentsByPayee(payee) {
  return new Promise(async (resolve) => {
    const response = await PaymentSchema.findPaymentsByPayee(payee);
    resolve(response);
  });
}

module.exports = {
  createPayment,
  findPaymentByLedgerId,
  findPaymentsByDate,
  findPaymentsByDojo,
  findPaymentsByPayee,
};
